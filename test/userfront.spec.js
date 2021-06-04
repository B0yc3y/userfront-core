import Userfront from "../src/index.js";
import Signon from "../src/signon.js";
import { store } from "../src/store.js";

/**
 * Using Rewire, we can get an unexported function from our module:
 * const signupWithSSO = Userfront.__get__("signupWithSSO");
 *
 * and also set a function this way:
 * const mockFn = jest.fn()
 * Userfront.__set__("signupWithSSO", mockFn);
 */

const tenantId = "abcdefg";
Userfront.init(tenantId);

// Using `window.location.assign` rather than `window.location.href =` because
// JSDOM throws an error "Error: Not implemented: navigation (except hash changes)"
// JSDOM complains about this is because JSDOM does not implement methods like window.alert, window.location.assign, etc.
// https://stackoverflow.com/a/54477957
delete window.location;
window.location = {
  assign: jest.fn(),
  origin: "https://example.com",
  href: "https://example.com/login",
};

describe("addInitCallback", () => {
  it("should add callbacks that are fired when Userfront.init(tenantId) is called", () => {
    const tenantId = "a9b8c7d6";
    const callbackA = jest.fn();
    const callbackB = jest.fn();

    // Add callbacks
    Userfront.addInitCallback(callbackA);
    Userfront.addInitCallback(callbackB);

    // Call Userfront.init()
    Userfront.init(tenantId);

    // Assert that callbacks were called
    expect(callbackA).toHaveBeenCalled();
    expect(callbackA).toHaveBeenCalledWith({ tenantId });
    expect(callbackB).toHaveBeenCalled();
    expect(callbackB).toHaveBeenCalledWith({ tenantId });

    // Calling Userfront.init() again should not call the callbacks again
    jest.clearAllMocks();
    Userfront.init(tenantId);

    expect(callbackA).not.toHaveBeenCalled();
    expect(callbackB).not.toHaveBeenCalled();
  });
});

describe("signupWithSSO", () => {
  const provider = "github";
  const loginUrl = `https://api.userfront.com/v0/auth/${provider}/login`;

  beforeAll(() => {
    // Expose non-exported function
    Signon.signupWithSSO = Signon.__get__("signupWithSSO");

    // Mock getProviderLink
    Signon.__set__(
      "getProviderLink",
      jest.fn(() => loginUrl)
    );
    Signon.getProviderLink = Signon.__get__("getProviderLink");
  });

  afterAll(() => {
    // Revert getProviderLink
    Signon.__ResetDependency__("getProviderLink");
    Signon.getProviderLink = Signon.__get__("getProviderLink");
    window.location.assign.mockClear();
  });

  it("should throw if provider is missing", () => {
    expect(() => Signon.signupWithSSO()).toThrow("Missing provider");
    expect(Signon.getProviderLink).not.toHaveBeenCalled();
  });

  it("should get provider link and redirect", () => {
    Signon.signupWithSSO(provider);

    // Assert getProviderLink was called and user is redirected
    expect(Signon.getProviderLink).toHaveBeenCalledTimes(1);
    expect(Signon.getProviderLink).toHaveBeenCalledWith(provider);
    expect(window.location.assign).toHaveBeenCalledTimes(1);
    expect(window.location.assign).toHaveBeenCalledWith(loginUrl);
  });
});

describe("loginWithSSO", () => {
  const provider = "github";
  const loginUrl = `https://api.userfront.com/v0/auth/${provider}/login`;

  beforeAll(() => {
    // Expose non-exported function
    Signon.loginWithSSO = Signon.__get__("loginWithSSO");

    // Mock getProviderLink
    Signon.__set__(
      "getProviderLink",
      jest.fn(() => loginUrl)
    );
    Signon.getProviderLink = Signon.__get__("getProviderLink");
  });

  afterAll(() => {
    // Revert getProviderLink
    Signon.__ResetDependency__("getProviderLink");
    Signon.getProviderLink = Signon.__get__("getProviderLink");
    window.location.assign.mockClear();
  });

  it("should throw if provider is missing", () => {
    expect(() => Signon.loginWithSSO()).toThrow("Missing provider");
    expect(Signon.getProviderLink).not.toHaveBeenCalled();
  });

  it("should get provider link and redirect", () => {
    Signon.loginWithSSO(provider);

    // Assert getProviderLink was called and user is redirected
    expect(Signon.getProviderLink).toHaveBeenCalledTimes(1);
    expect(Signon.getProviderLink).toHaveBeenCalledWith(provider);
    expect(window.location.assign).toHaveBeenCalledTimes(1);
    expect(window.location.assign).toHaveBeenCalledWith(loginUrl);
  });
});

describe("getProviderLink", () => {
  const provider = "github";
  let loginUrl =
    `https://api.userfront.com/v0/auth/${provider}/login?` +
    `tenant_id=${tenantId}&` +
    `origin=${window.location.origin}`;

  it("should throw if provider is missing", () => {
    expect(() => Signon.getProviderLink()).toThrow("Missing provider");
  });

  it("should throw if tenant ID is missing", () => {
    store.tenantId = "";
    expect(() => Signon.getProviderLink(provider)).toThrow("Missing tenant ID");

    // Revert tenantId
    store.tenantId = tenantId;
  });

  it("should return link with correct tenant_id, and origin", () => {
    window.location.href = "https://example.com/login";

    const url = Signon.getProviderLink(provider);
    expect(getQueryAttr(url, "tenant_id")).toEqual(tenantId);
    expect(getQueryAttr(url, "origin")).toEqual(window.location.origin);
    expect(getQueryAttr(url, "redirect")).toBeUndefined();
    expect(url).toEqual(loginUrl);
  });

  it("should return link with redirect if provided", () => {
    window.location.href += `?redirect=%2Fdashboard`;

    const redirectParam = encodeURIComponent(
      getQueryAttr(window.location.href, "redirect")
    );
    loginUrl += `&redirect=${redirectParam}`;

    const url = Signon.getProviderLink(provider);
    expect(getQueryAttr(url, "tenant_id")).toEqual(tenantId);
    expect(getQueryAttr(url, "origin")).toEqual(window.location.origin);
    expect(getQueryAttr(url, "redirect")).toEqual("/dashboard");
    expect(url).toEqual(loginUrl);
  });
});

function getQueryAttr(url, attrName) {
  if (!url || url.indexOf(`${attrName}=`) < 0) {
    return;
  }
  return decodeURIComponent(url.split(`${attrName}=`)[1].split("&")[0]);
}
