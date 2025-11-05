var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, a as reactDomExports, R as React, b as React$1 } from "./vendor-7752ec68.js";
(/* @__PURE__ */ __name(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  __name(getFetchOpts, "getFetchOpts");
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
  __name(processPreload, "processPreload");
}, "polyfill"))();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$2 = reactExports, k$1 = Symbol.for("react.element"), l$1 = Symbol.for("react.fragment"), m$2 = Object.prototype.hasOwnProperty, n$2 = f$2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c2, a2, g2) {
  var b, d2 = {}, e2 = null, h2 = null;
  void 0 !== g2 && (e2 = "" + g2);
  void 0 !== a2.key && (e2 = "" + a2.key);
  void 0 !== a2.ref && (h2 = a2.ref);
  for (b in a2)
    m$2.call(a2, b) && !p$1.hasOwnProperty(b) && (d2[b] = a2[b]);
  if (c2 && c2.defaultProps)
    for (b in a2 = c2.defaultProps, a2)
      void 0 === d2[b] && (d2[b] = a2[b]);
  return { $$typeof: k$1, type: c2, key: e2, ref: h2, props: d2, _owner: n$2.current };
}
__name(q, "q");
reactJsxRuntime_production_min.Fragment = l$1;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var m$1 = reactDomExports;
{
  client.createRoot = m$1.createRoot;
  client.hydrateRoot = m$1.hydrateRoot;
}
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
__name(_extends$1, "_extends$1");
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  __name(createBrowserLocation, "createBrowserLocation");
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  __name(createBrowserHref, "createBrowserHref");
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
__name(createBrowserHistory, "createBrowserHistory");
function invariant$1(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
__name(invariant$1, "invariant$1");
function warning$1(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e2) {
    }
  }
}
__name(warning$1, "warning$1");
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
__name(createKey, "createKey");
function getHistoryState(location, index2) {
  return {
    usr: location.state,
    key: location.key,
    idx: index2
  };
}
__name(getHistoryState, "getHistoryState");
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends$1({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
__name(createLocation, "createLocation");
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
__name(createPath, "createPath");
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
__name(parsePath, "parsePath");
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index2 = getIndex();
  if (index2 == null) {
    index2 = 0;
    globalHistory.replaceState(_extends$1({}, globalHistory.state, {
      idx: index2
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  __name(getIndex, "getIndex");
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index2;
    index2 = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  __name(handlePop, "handlePop");
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex() + 1;
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  __name(push, "push");
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex();
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  __name(replace, "replace");
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant$1(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  __name(createURL, "createURL");
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
__name(getUrlBasedHistory, "getUrlBasedHistory");
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename, false);
}
__name(matchRoutes, "matchRoutes");
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i2], decoded, allowPartial);
  }
  return matches;
}
__name(matchRoutesImpl, "matchRoutesImpl");
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = /* @__PURE__ */ __name((route, index2, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index2,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant$1(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant$1(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  }, "flattenRoute");
  routes.forEach((route, index2) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index2);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index2, exploded);
      }
    }
  });
  return branches;
}
__name(flattenRoutes, "flattenRoutes");
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
__name(explodeOptionalSegments, "explodeOptionalSegments");
function rankRouteBranches(branches) {
  branches.sort((a2, b) => a2.score !== b.score ? b.score - a2.score : compareIndexes(a2.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
__name(rankRouteBranches, "rankRouteBranches");
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = /* @__PURE__ */ __name((s2) => s2 === "*", "isSplat");
function computeScore(path, index2) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index2) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s2) => !isSplat(s2)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
__name(computeScore, "computeScore");
function compareIndexes(a2, b) {
  let siblings = a2.length === b.length && a2.slice(0, -1).every((n2, i2) => n2 === b[i2]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a2[a2.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
__name(compareIndexes, "compareIndexes");
function matchRouteBranch(branch, pathname, allowPartial) {
  if (allowPartial === void 0) {
    allowPartial = false;
  }
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i2 = 0; i2 < routesMeta.length; ++i2) {
    let meta = routesMeta[i2];
    let end = i2 === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
__name(matchRouteBranch, "matchRouteBranch");
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo2, _ref, index2) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index2] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index2];
    if (isOptional && !value) {
      memo2[paramName] = void 0;
    } else {
      memo2[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo2;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
__name(matchPath, "matchPath");
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning$1(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_2, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else
    ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
__name(compilePath, "compilePath");
function decodePath(value) {
  try {
    return value.split("/").map((v2) => decodeURIComponent(v2).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning$1(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
__name(decodePath, "decodePath");
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
__name(stripBasename, "stripBasename");
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
__name(resolvePath, "resolvePath");
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
__name(resolvePathname, "resolvePathname");
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
__name(getInvalidPathError, "getInvalidPathError");
function getPathContributingMatches(matches) {
  return matches.filter((match, index2) => index2 === 0 || match.route.path && match.route.path.length > 0);
}
__name(getPathContributingMatches, "getPathContributingMatches");
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
__name(getResolveToMatches, "getResolveToMatches");
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$1({}, toArg);
    invariant$1(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant$1(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant$1(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
__name(resolveTo, "resolveTo");
const joinPaths = /* @__PURE__ */ __name((paths) => paths.join("/").replace(/\/\/+/g, "/"), "joinPaths");
const normalizePathname = /* @__PURE__ */ __name((pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/"), "normalizePathname");
const normalizeSearch = /* @__PURE__ */ __name((search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search, "normalizeSearch");
const normalizeHash = /* @__PURE__ */ __name((hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash, "normalizeHash");
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
__name(isRouteErrorResponse, "isRouteErrorResponse");
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
__name(_extends, "_extends");
const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
const DataRouterStateContext = /* @__PURE__ */ reactExports.createContext(null);
const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
const RouteContext = /* @__PURE__ */ reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
const RouteErrorContext = /* @__PURE__ */ reactExports.createContext(null);
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
__name(useInRouterContext, "useInRouterContext");
function useLocation() {
  !useInRouterContext() ? invariant$1(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
__name(useLocation, "useLocation");
function useIsomorphicLayoutEffect$1(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
__name(useIsomorphicLayoutEffect$1, "useIsomorphicLayoutEffect$1");
function useNavigate() {
  let {
    isDataRoute
  } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
__name(useNavigate, "useNavigate");
function useNavigateUnstable() {
  !useInRouterContext() ? invariant$1(false) : void 0;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect$1(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator2.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
  }, [basename, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
__name(useNavigateUnstable, "useNavigateUnstable");
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
__name(useRoutes, "useRoutes");
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ? invariant$1(false) : void 0;
  let {
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant$1(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState, future);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
      value: {
        location: _extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
__name(useRoutesImpl, "useRoutesImpl");
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
__name(DefaultErrorComponent, "DefaultErrorComponent");
const defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
const _RenderErrorBoundary = class _RenderErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
};
__name(_RenderErrorBoundary, "RenderErrorBoundary");
let RenderErrorBoundary = _RenderErrorBoundary;
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
__name(RenderedRoute, "RenderedRoute");
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _future;
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
    !(errorIndex >= 0) ? invariant$1(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i2 = 0; i2 < renderedMatches.length; i2++) {
      let match = renderedMatches[i2];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i2;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors: errors2
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index2) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index2 === 0) {
          warningOnce("route-fallback", false);
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index2) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index2 + 1));
    let getChildren = /* @__PURE__ */ __name(() => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    }, "getChildren");
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index2 === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
__name(_renderMatches, "_renderMatches");
var DataRouterHook$1 = /* @__PURE__ */ function(DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
  DataRouterHook2["UseNavigateStable"] = "useNavigate";
  return DataRouterHook2;
}(DataRouterHook$1 || {});
var DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
  return DataRouterStateHook2;
}(DataRouterStateHook$1 || {});
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  !ctx ? invariant$1(false) : void 0;
  return ctx;
}
__name(useDataRouterContext, "useDataRouterContext");
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant$1(false) : void 0;
  return state;
}
__name(useDataRouterState, "useDataRouterState");
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant$1(false) : void 0;
  return route;
}
__name(useRouteContext, "useRouteContext");
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant$1(false) : void 0;
  return thisRoute.route.id;
}
__name(useCurrentRouteId, "useCurrentRouteId");
function useRouteError() {
  var _state$errors;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
  if (error !== void 0) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
__name(useRouteError, "useRouteError");
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
  let id2 = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect$1(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends({
        fromRouteId: id2
      }, options));
    }
  }, [router, id2]);
  return navigate;
}
__name(useNavigateStable, "useNavigateStable");
const alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned$1[key]) {
    alreadyWarned$1[key] = true;
  }
}
__name(warningOnce, "warningOnce");
function logV6DeprecationWarnings(renderFuture, routerFuture) {
  if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0)
    ;
  if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && (!routerFuture || routerFuture.v7_relativeSplatPath === void 0))
    ;
  if (routerFuture) {
    if (routerFuture.v7_fetcherPersist === void 0)
      ;
    if (routerFuture.v7_normalizeFormMethod === void 0)
      ;
    if (routerFuture.v7_partialHydration === void 0)
      ;
    if (routerFuture.v7_skipActionErrorRevalidation === void 0)
      ;
  }
}
__name(logV6DeprecationWarnings, "logV6DeprecationWarnings");
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ? invariant$1(false) : void 0;
  let {
    future,
    static: isStatic
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  reactExports.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]);
  return null;
}
__name(Navigate, "Navigate");
function Route(_props) {
  invariant$1(false);
}
__name(Route, "Route");
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? invariant$1(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp,
    future: _extends({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
__name(Router, "Router");
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
__name(Routes, "Routes");
new Promise(() => {
});
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  reactExports.Children.forEach(children, (element, index2) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index2];
    if (element.type === reactExports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ? invariant$1(false) : void 0;
    !(!element.props.index || !element.props.children) ? invariant$1(false) : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
__name(createRoutesFromChildren, "createRoutesFromChildren");
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e2) {
}
const START_TRANSITION = "startTransition";
const startTransitionImpl = React[START_TRANSITION];
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref4;
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = reactExports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  reactExports.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ reactExports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
__name(BrowserRouter, "BrowserRouter");
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
const MotionConfigContext = reactExports.createContext({
  transformPagePoint: (p2) => p2,
  isStatic: false,
  reducedMotion: "never"
});
const MotionContext = reactExports.createContext({});
const PresenceContext = reactExports.createContext(null);
const isBrowser = typeof document !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? reactExports.useLayoutEffect : reactExports.useEffect;
const LazyContext = reactExports.createContext({ strict: false });
const camelToDash = /* @__PURE__ */ __name((str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), "camelToDash");
const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);
function useVisualElement(Component, visualState, props, createVisualElement) {
  const { visualElement: parent } = reactExports.useContext(MotionContext);
  const lazyContext = reactExports.useContext(LazyContext);
  const presenceContext = reactExports.useContext(PresenceContext);
  const reducedMotionConfig = reactExports.useContext(MotionConfigContext).reducedMotion;
  const visualElementRef = reactExports.useRef();
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component, {
      visualState,
      parent,
      props,
      presenceContext,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig
    });
  }
  const visualElement = visualElementRef.current;
  reactExports.useInsertionEffect(() => {
    visualElement && visualElement.update(props, presenceContext);
  });
  const wantsHandoff = reactExports.useRef(Boolean(props[optimizedAppearDataAttribute] && !window.HandoffComplete));
  useIsomorphicLayoutEffect(() => {
    if (!visualElement)
      return;
    visualElement.render();
    if (wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  reactExports.useEffect(() => {
    if (!visualElement)
      return;
    visualElement.updateFeatures();
    if (!wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
    if (wantsHandoff.current) {
      wantsHandoff.current = false;
      window.HandoffComplete = true;
    }
  });
  return visualElement;
}
__name(useVisualElement, "useVisualElement");
function isRefObject(ref) {
  return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
__name(isRefObject, "isRefObject");
function useMotionRef(visualState, visualElement, externalRef) {
  return reactExports.useCallback(
    (instance) => {
      instance && visualState.mount && visualState.mount(instance);
      if (visualElement) {
        instance ? visualElement.mount(instance) : visualElement.unmount();
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]
  );
}
__name(useMotionRef, "useMotionRef");
function isVariantLabel(v2) {
  return typeof v2 === "string" || Array.isArray(v2);
}
__name(isVariantLabel, "isVariantLabel");
function isAnimationControls(v2) {
  return v2 !== null && typeof v2 === "object" && typeof v2.start === "function";
}
__name(isAnimationControls, "isAnimationControls");
const variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
const variantProps = ["initial", ...variantPriorityOrder];
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
__name(isControllingVariants, "isControllingVariants");
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}
__name(isVariantNode, "isVariantNode");
function getCurrentTreeVariants(props, context) {
  if (isControllingVariants(props)) {
    const { initial, animate } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate) ? animate : void 0
    };
  }
  return props.inherit !== false ? context : {};
}
__name(getCurrentTreeVariants, "getCurrentTreeVariants");
function useCreateMotionContext(props) {
  const { initial, animate } = getCurrentTreeVariants(props, reactExports.useContext(MotionContext));
  return reactExports.useMemo(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
__name(useCreateMotionContext, "useCreateMotionContext");
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}
__name(variantLabelsAsDependency, "variantLabelsAsDependency");
const featureProps = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
const featureDefinitions = {};
for (const key in featureProps) {
  featureDefinitions[key] = {
    isEnabled: (props) => featureProps[key].some((name) => !!props[name])
  };
}
function loadFeatures(features) {
  for (const key in features) {
    featureDefinitions[key] = {
      ...featureDefinitions[key],
      ...features[key]
    };
  }
}
__name(loadFeatures, "loadFeatures");
const LayoutGroupContext = reactExports.createContext({});
const SwitchLayoutGroupContext = reactExports.createContext({});
const motionComponentSymbol = Symbol.for("motionComponentSymbol");
function createMotionComponent({ preloadedFeatures: preloadedFeatures2, createVisualElement, useRender, useVisualState, Component }) {
  preloadedFeatures2 && loadFeatures(preloadedFeatures2);
  function MotionComponent(props, externalRef) {
    let MeasureLayout2;
    const configAndProps = {
      ...reactExports.useContext(MotionConfigContext),
      ...props,
      layoutId: useLayoutId(props)
    };
    const { isStatic } = configAndProps;
    const context = useCreateMotionContext(props);
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement);
      const initialLayoutGroupConfig = reactExports.useContext(SwitchLayoutGroupContext);
      const isStrict = reactExports.useContext(LazyContext).strict;
      if (context.visualElement) {
        MeasureLayout2 = context.visualElement.loadFeatures(
          // Note: Pass the full new combined props to correctly re-render dynamic feature components.
          configAndProps,
          isStrict,
          preloadedFeatures2,
          initialLayoutGroupConfig
        );
      }
    }
    return reactExports.createElement(
      MotionContext.Provider,
      { value: context },
      MeasureLayout2 && context.visualElement ? reactExports.createElement(MeasureLayout2, { visualElement: context.visualElement, ...configAndProps }) : null,
      useRender(Component, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)
    );
  }
  __name(MotionComponent, "MotionComponent");
  const ForwardRefComponent = reactExports.forwardRef(MotionComponent);
  ForwardRefComponent[motionComponentSymbol] = Component;
  return ForwardRefComponent;
}
__name(createMotionComponent, "createMotionComponent");
function useLayoutId({ layoutId }) {
  const layoutGroupId = reactExports.useContext(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
__name(useLayoutId, "useLayoutId");
function createMotionProxy(createConfig) {
  function custom(Component, customMotionComponentConfig = {}) {
    return createMotionComponent(createConfig(Component, customMotionComponentConfig));
  }
  __name(custom, "custom");
  if (typeof Proxy === "undefined") {
    return custom;
  }
  const componentCache = /* @__PURE__ */ new Map();
  return new Proxy(custom, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (_target, key) => {
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }
      return componentCache.get(key);
    }
  });
}
__name(createMotionProxy, "createMotionProxy");
const lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function isSVGComponent(Component) {
  if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component !== "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    Component.includes("-")
  ) {
    return false;
  } else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.indexOf(Component) > -1 || /**
     * If it contains a capital letter, it's an SVG component
     */
    /[A-Z]/.test(Component)
  ) {
    return true;
  }
  return false;
}
__name(isSVGComponent, "isSVGComponent");
const scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}
__name(addScaleCorrector, "addScaleCorrector");
const transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
const transformProps = new Set(transformPropOrder);
function isForcedMotionValue(key, { layout: layout2, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout2 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
__name(isForcedMotionValue, "isForcedMotionValue");
const isMotionValue = /* @__PURE__ */ __name((value) => Boolean(value && value.getVelocity), "isMotionValue");
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
const numTransforms = transformPropOrder.length;
function buildTransform(transform, { enableHardwareAcceleration = true, allowTransformNone = true }, transformIsDefault, transformTemplate) {
  let transformString = "";
  for (let i2 = 0; i2 < numTransforms; i2++) {
    const key = transformPropOrder[i2];
    if (transform[key] !== void 0) {
      const transformName = translateAlias[key] || key;
      transformString += `${transformName}(${transform[key]}) `;
    }
  }
  if (enableHardwareAcceleration && !transform.z) {
    transformString += "translateZ(0)";
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
__name(buildTransform, "buildTransform");
const checkStringStartsWith = /* @__PURE__ */ __name((token) => (key) => typeof key === "string" && key.startsWith(token), "checkStringStartsWith");
const isCSSVariableName = checkStringStartsWith("--");
const isCSSVariableToken = checkStringStartsWith("var(--");
const cssVariableRegex = /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g;
const getValueAsType = /* @__PURE__ */ __name((value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
}, "getValueAsType");
const clamp = /* @__PURE__ */ __name((min, max, v2) => Math.min(Math.max(v2, min), max), "clamp");
const number = {
  test: (v2) => typeof v2 === "number",
  parse: parseFloat,
  transform: (v2) => v2
};
const alpha = {
  ...number,
  transform: (v2) => clamp(0, 1, v2)
};
const scale = {
  ...number,
  default: 1
};
const sanitize = /* @__PURE__ */ __name((v2) => Math.round(v2 * 1e5) / 1e5, "sanitize");
const floatRegex = /(-)?([\d]*\.?[\d])+/g;
const colorRegex = /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
const singleColorRegex = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function isString(v2) {
  return typeof v2 === "string";
}
__name(isString, "isString");
const createUnitType = /* @__PURE__ */ __name((unit) => ({
  test: (v2) => isString(v2) && v2.endsWith(unit) && v2.split(" ").length === 1,
  parse: parseFloat,
  transform: (v2) => `${v2}${unit}`
}), "createUnitType");
const degrees = createUnitType("deg");
const percent = createUnitType("%");
const px = createUnitType("px");
const vh = createUnitType("vh");
const vw = createUnitType("vw");
const progressPercentage = {
  ...percent,
  parse: (v2) => percent.parse(v2) / 100,
  transform: (v2) => percent.transform(v2 * 100)
};
const int = {
  ...number,
  transform: Math.round
};
const numberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Transform props
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  // Misc
  zIndex: int,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
function buildHTMLStyles(state, latestValues, options, transformTemplate) {
  const { style, vars, transform, transformOrigin } = state;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  let transformIsNone = true;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    }
    const valueType = numberValueTypes[key];
    const valueAsType = getValueAsType(value, valueType);
    if (transformProps.has(key)) {
      hasTransform2 = true;
      transform[key] = valueAsType;
      if (!transformIsNone)
        continue;
      if (value !== (valueType.default || 0))
        transformIsNone = false;
    } else if (key.startsWith("origin")) {
      hasTransformOrigin = true;
      transformOrigin[key] = valueAsType;
    } else {
      style[key] = valueAsType;
    }
  }
  if (!latestValues.transform) {
    if (hasTransform2 || transformTemplate) {
      style.transform = buildTransform(state.transform, options, transformIsNone, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}
__name(buildHTMLStyles, "buildHTMLStyles");
const createHtmlRenderState = /* @__PURE__ */ __name(() => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
}), "createHtmlRenderState");
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
__name(copyRawValuesOnly, "copyRawValuesOnly");
function useInitialMotionValues({ transformTemplate }, visualState, isStatic) {
  return reactExports.useMemo(() => {
    const state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
    return Object.assign({}, state.vars, state.style);
  }, [visualState]);
}
__name(useInitialMotionValues, "useInitialMotionValues");
function useStyle(props, visualState, isStatic) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
  return props.transformValues ? props.transformValues(style) : style;
}
__name(useStyle, "useStyle");
function useHTMLProps(props, visualState, isStatic) {
  const htmlProps = {};
  const style = useStyle(props, visualState, isStatic);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
    htmlProps.tabIndex = 0;
  }
  htmlProps.style = style;
  return htmlProps;
}
__name(useHTMLProps, "useHTMLProps");
const validMotionProps = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "transformValues",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function isValidMotionProp(key) {
  return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}
__name(isValidMotionProp, "isValidMotionProp");
let shouldForward = /* @__PURE__ */ __name((key) => !isValidMotionProp(key), "shouldForward");
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = /* @__PURE__ */ __name((key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key), "shouldForward");
}
__name(loadExternalIsValidProp, "loadExternalIsValidProp");
try {
  loadExternalIsValidProp(require("@emotion/is-prop-valid").default);
} catch (_a) {
}
function filterProps(props, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (key === "values" && typeof props.values === "object")
      continue;
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || // If trying to use native HTML drag events, forward drag listeners
    props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}
__name(filterProps, "filterProps");
function calcOrigin$1(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
__name(calcOrigin$1, "calcOrigin$1");
function calcSVGTransformOrigin(dimensions, originX, originY) {
  const pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
  const pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}
__name(calcSVGTransformOrigin, "calcSVGTransformOrigin");
const dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
const camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = px.transform(-offset);
  const pathLength = px.transform(length);
  const pathSpacing = px.transform(spacing);
  attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}
__name(buildSVGPath, "buildSVGPath");
function buildSVGAttrs(state, {
  attrX,
  attrY,
  attrScale,
  originX,
  originY,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, options, isSVGTag2, transformTemplate) {
  buildHTMLStyles(state, latest, options, transformTemplate);
  if (isSVGTag2) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const { attrs, style, dimensions } = state;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}
__name(buildSVGAttrs, "buildSVGAttrs");
const createSvgRenderState = /* @__PURE__ */ __name(() => ({
  ...createHtmlRenderState(),
  attrs: {}
}), "createSvgRenderState");
const isSVGTag = /* @__PURE__ */ __name((tag) => typeof tag === "string" && tag.toLowerCase() === "svg", "isSVGTag");
function useSVGProps(props, visualState, _isStatic, Component) {
  const visualProps = reactExports.useMemo(() => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, { enableHardwareAcceleration: false }, isSVGTag(Component), props.transformTemplate);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}
__name(useSVGProps, "useSVGProps");
function createUseRender(forwardMotionProps = false) {
  const useRender = /* @__PURE__ */ __name((Component, props, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(Component) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component);
    const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
    const elementProps = {
      ...filteredProps,
      ...visualProps,
      ref
    };
    const { children } = props;
    const renderedChildren = reactExports.useMemo(() => isMotionValue(children) ? children.get() : children, [children]);
    return reactExports.createElement(Component, {
      ...elementProps,
      children: renderedChildren
    });
  }, "useRender");
  return useRender;
}
__name(createUseRender, "createUseRender");
function renderHTML(element, { style, vars }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}
__name(renderHTML, "renderHTML");
const camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}
__name(renderSVG, "renderSVG");
function scrapeMotionValuesFromProps$1(props, prevProps) {
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}
__name(scrapeMotionValuesFromProps$1, "scrapeMotionValuesFromProps$1");
function scrapeMotionValuesFromProps(props, prevProps) {
  const newValues = scrapeMotionValuesFromProps$1(props, prevProps);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}
__name(scrapeMotionValuesFromProps, "scrapeMotionValuesFromProps");
function resolveVariantFromProps(props, definition, custom, currentValues = {}, currentVelocity = {}) {
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  return definition;
}
__name(resolveVariantFromProps, "resolveVariantFromProps");
function useConstant(init) {
  const ref = reactExports.useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}
__name(useConstant, "useConstant");
const isKeyframesTarget = /* @__PURE__ */ __name((v2) => {
  return Array.isArray(v2);
}, "isKeyframesTarget");
const isCustomValue = /* @__PURE__ */ __name((v2) => {
  return Boolean(v2 && typeof v2 === "object" && v2.mix && v2.toValue);
}, "isCustomValue");
const resolveFinalValueInKeyframes = /* @__PURE__ */ __name((v2) => {
  return isKeyframesTarget(v2) ? v2[v2.length - 1] || 0 : v2;
}, "resolveFinalValueInKeyframes");
function resolveMotionValue(value) {
  const unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
__name(resolveMotionValue, "resolveMotionValue");
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState, onMount }, props, context, presenceContext) {
  const state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
    renderState: createRenderState()
  };
  if (onMount) {
    state.mount = (instance) => onMount(props, instance, state);
  }
  return state;
}
__name(makeState, "makeState");
const makeUseVisualState = /* @__PURE__ */ __name((config) => (props, isStatic) => {
  const context = reactExports.useContext(MotionContext);
  const presenceContext = reactExports.useContext(PresenceContext);
  const make = /* @__PURE__ */ __name(() => makeState(config, props, context, presenceContext), "make");
  return isStatic ? make() : useConstant(make);
}, "makeUseVisualState");
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props, {});
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate } = props;
  const isControllingVariants$1 = isControllingVariants(props);
  const isVariantNode$1 = isVariantNode(props);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate === void 0)
      animate = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      const { transitionEnd, transition, ...target } = resolved;
      for (const key in target) {
        let valueTarget = target[key];
        if (Array.isArray(valueTarget)) {
          const index2 = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
          valueTarget = valueTarget[index2];
        }
        if (valueTarget !== null) {
          values[key] = valueTarget;
        }
      }
      for (const key in transitionEnd)
        values[key] = transitionEnd[key];
    });
  }
  return values;
}
__name(makeLatestValues, "makeLatestValues");
const noop = /* @__PURE__ */ __name((any) => any, "noop");
const _Queue = class _Queue {
  constructor() {
    this.order = [];
    this.scheduled = /* @__PURE__ */ new Set();
  }
  add(process) {
    if (!this.scheduled.has(process)) {
      this.scheduled.add(process);
      this.order.push(process);
      return true;
    }
  }
  remove(process) {
    const index2 = this.order.indexOf(process);
    if (index2 !== -1) {
      this.order.splice(index2, 1);
      this.scheduled.delete(process);
    }
  }
  clear() {
    this.order.length = 0;
    this.scheduled.clear();
  }
};
__name(_Queue, "Queue");
let Queue = _Queue;
function createRenderStep(runNextFrame) {
  let thisFrame = new Queue();
  let nextFrame = new Queue();
  let numToRun = 0;
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (queue.add(callback) && addToCurrentFrame && isProcessing) {
        numToRun = thisFrame.order.length;
      }
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame.remove(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData2) => {
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      [thisFrame, nextFrame] = [nextFrame, thisFrame];
      nextFrame.clear();
      numToRun = thisFrame.order.length;
      if (numToRun) {
        for (let i2 = 0; i2 < numToRun; i2++) {
          const callback = thisFrame.order[i2];
          callback(frameData2);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame();
          }
        }
      }
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData2);
      }
    }
  };
  return step;
}
__name(createRenderStep, "createRenderStep");
const stepsOrder = [
  "prepare",
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
];
const maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const steps2 = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(() => runNextFrame = true);
    return acc;
  }, {});
  const processStep = /* @__PURE__ */ __name((stepId) => steps2[stepId].process(state), "processStep");
  const processBatch = /* @__PURE__ */ __name(() => {
    const timestamp = performance.now();
    runNextFrame = false;
    state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
    state.timestamp = timestamp;
    state.isProcessing = true;
    stepsOrder.forEach(processStep);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  }, "processBatch");
  const wake = /* @__PURE__ */ __name(() => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  }, "wake");
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps2[key];
    acc[key] = (process, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = /* @__PURE__ */ __name((process) => stepsOrder.forEach((key) => steps2[key].cancel(process)), "cancel");
  return { schedule, cancel, state, steps: steps2 };
}
__name(createRenderBatcher, "createRenderBatcher");
const { schedule: frame, cancel: cancelFrame, state: frameData, steps } = createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
const svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createSvgRenderState,
    onMount: (props, instance, { renderState, latestValues }) => {
      frame.read(() => {
        try {
          renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
        } catch (e2) {
          renderState.dimensions = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
      });
      frame.render(() => {
        buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, isSVGTag(instance.tagName), props.transformTemplate);
        renderSVG(instance, renderState);
      });
    }
  })
};
const htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
    createRenderState: createHtmlRenderState
  })
};
function createDomMotionConfig(Component, { forwardMotionProps = false }, preloadedFeatures2, createVisualElement) {
  const baseConfig = isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig;
  return {
    ...baseConfig,
    preloadedFeatures: preloadedFeatures2,
    useRender: createUseRender(forwardMotionProps),
    createVisualElement,
    Component
  };
}
__name(createDomMotionConfig, "createDomMotionConfig");
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}
__name(addDomEvent, "addDomEvent");
const isPrimaryPointer = /* @__PURE__ */ __name((event) => {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
}, "isPrimaryPointer");
function extractEventInfo(event, pointType = "page") {
  return {
    point: {
      x: event[pointType + "X"],
      y: event[pointType + "Y"]
    }
  };
}
__name(extractEventInfo, "extractEventInfo");
const addPointerInfo = /* @__PURE__ */ __name((handler) => {
  return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
}, "addPointerInfo");
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
__name(addPointerEvent, "addPointerEvent");
const combineFunctions = /* @__PURE__ */ __name((a2, b) => (v2) => b(a2(v2)), "combineFunctions");
const pipe = /* @__PURE__ */ __name((...transformers) => transformers.reduce(combineFunctions), "pipe");
function createLock(name) {
  let lock = null;
  return () => {
    const openLock = /* @__PURE__ */ __name(() => {
      lock = null;
    }, "openLock");
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
__name(createLock, "createLock");
const globalHorizontalLock = createLock("dragHorizontal");
const globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  let lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    const openHorizontal = globalHorizontalLock();
    const openVertical = globalVerticalLock();
    if (openHorizontal && openVertical) {
      lock = /* @__PURE__ */ __name(() => {
        openHorizontal();
        openVertical();
      }, "lock");
    } else {
      if (openHorizontal)
        openHorizontal();
      if (openVertical)
        openVertical();
    }
  }
  return lock;
}
__name(getGlobalLock, "getGlobalLock");
function isDragActive() {
  const openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}
__name(isDragActive, "isDragActive");
const _Feature = class _Feature {
  constructor(node) {
    this.isMounted = false;
    this.node = node;
  }
  update() {
  }
};
__name(_Feature, "Feature");
let Feature = _Feature;
function addHoverEvent(node, isActive) {
  const eventName = "pointer" + (isActive ? "enter" : "leave");
  const callbackName = "onHover" + (isActive ? "Start" : "End");
  const handleEvent = /* @__PURE__ */ __name((event, info) => {
    if (event.pointerType === "touch" || isDragActive())
      return;
    const props = node.getProps();
    if (node.animationState && props.whileHover) {
      node.animationState.setActive("whileHover", isActive);
    }
    if (props[callbackName]) {
      frame.update(() => props[callbackName](event, info));
    }
  }, "handleEvent");
  return addPointerEvent(node.current, eventName, handleEvent, {
    passive: !node.getProps()[callbackName]
  });
}
__name(addHoverEvent, "addHoverEvent");
const _HoverGesture = class _HoverGesture extends Feature {
  mount() {
    this.unmount = pipe(addHoverEvent(this.node, true), addHoverEvent(this.node, false));
  }
  unmount() {
  }
};
__name(_HoverGesture, "HoverGesture");
let HoverGesture = _HoverGesture;
const _FocusGesture = class _FocusGesture extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.node.current.matches(":focus-visible");
    } catch (e2) {
      isFocusVisible = true;
    }
    if (!isFocusVisible || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
};
__name(_FocusGesture, "FocusGesture");
let FocusGesture = _FocusGesture;
const isNodeOrChild = /* @__PURE__ */ __name((parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
}, "isNodeOrChild");
function fireSyntheticPointerEvent(name, handler) {
  if (!handler)
    return;
  const syntheticPointerEvent = new PointerEvent("pointer" + name);
  handler(syntheticPointerEvent, extractEventInfo(syntheticPointerEvent));
}
__name(fireSyntheticPointerEvent, "fireSyntheticPointerEvent");
const _PressGesture = class _PressGesture extends Feature {
  constructor() {
    super(...arguments);
    this.removeStartListeners = noop;
    this.removeEndListeners = noop;
    this.removeAccessibleListeners = noop;
    this.startPointerPress = (startEvent, startInfo) => {
      if (this.isPressing)
        return;
      this.removeEndListeners();
      const props = this.node.getProps();
      const endPointerPress = /* @__PURE__ */ __name((endEvent, endInfo) => {
        if (!this.checkPressEnd())
          return;
        const { onTap, onTapCancel, globalTapTarget } = this.node.getProps();
        frame.update(() => {
          !globalTapTarget && !isNodeOrChild(this.node.current, endEvent.target) ? onTapCancel && onTapCancel(endEvent, endInfo) : onTap && onTap(endEvent, endInfo);
        });
      }, "endPointerPress");
      const removePointerUpListener = addPointerEvent(window, "pointerup", endPointerPress, { passive: !(props.onTap || props["onPointerUp"]) });
      const removePointerCancelListener = addPointerEvent(window, "pointercancel", (cancelEvent, cancelInfo) => this.cancelPress(cancelEvent, cancelInfo), { passive: !(props.onTapCancel || props["onPointerCancel"]) });
      this.removeEndListeners = pipe(removePointerUpListener, removePointerCancelListener);
      this.startPress(startEvent, startInfo);
    };
    this.startAccessiblePress = () => {
      const handleKeydown = /* @__PURE__ */ __name((keydownEvent) => {
        if (keydownEvent.key !== "Enter" || this.isPressing)
          return;
        const handleKeyup = /* @__PURE__ */ __name((keyupEvent) => {
          if (keyupEvent.key !== "Enter" || !this.checkPressEnd())
            return;
          fireSyntheticPointerEvent("up", (event, info) => {
            const { onTap } = this.node.getProps();
            if (onTap) {
              frame.update(() => onTap(event, info));
            }
          });
        }, "handleKeyup");
        this.removeEndListeners();
        this.removeEndListeners = addDomEvent(this.node.current, "keyup", handleKeyup);
        fireSyntheticPointerEvent("down", (event, info) => {
          this.startPress(event, info);
        });
      }, "handleKeydown");
      const removeKeydownListener = addDomEvent(this.node.current, "keydown", handleKeydown);
      const handleBlur = /* @__PURE__ */ __name(() => {
        if (!this.isPressing)
          return;
        fireSyntheticPointerEvent("cancel", (cancelEvent, cancelInfo) => this.cancelPress(cancelEvent, cancelInfo));
      }, "handleBlur");
      const removeBlurListener = addDomEvent(this.node.current, "blur", handleBlur);
      this.removeAccessibleListeners = pipe(removeKeydownListener, removeBlurListener);
    };
  }
  startPress(event, info) {
    this.isPressing = true;
    const { onTapStart, whileTap } = this.node.getProps();
    if (whileTap && this.node.animationState) {
      this.node.animationState.setActive("whileTap", true);
    }
    if (onTapStart) {
      frame.update(() => onTapStart(event, info));
    }
  }
  checkPressEnd() {
    this.removeEndListeners();
    this.isPressing = false;
    const props = this.node.getProps();
    if (props.whileTap && this.node.animationState) {
      this.node.animationState.setActive("whileTap", false);
    }
    return !isDragActive();
  }
  cancelPress(event, info) {
    if (!this.checkPressEnd())
      return;
    const { onTapCancel } = this.node.getProps();
    if (onTapCancel) {
      frame.update(() => onTapCancel(event, info));
    }
  }
  mount() {
    const props = this.node.getProps();
    const removePointerListener = addPointerEvent(props.globalTapTarget ? window : this.node.current, "pointerdown", this.startPointerPress, { passive: !(props.onTapStart || props["onPointerStart"]) });
    const removeFocusListener = addDomEvent(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = pipe(removePointerListener, removeFocusListener);
  }
  unmount() {
    this.removeStartListeners();
    this.removeEndListeners();
    this.removeAccessibleListeners();
  }
};
__name(_PressGesture, "PressGesture");
let PressGesture = _PressGesture;
const observerCallbacks = /* @__PURE__ */ new WeakMap();
const observers = /* @__PURE__ */ new WeakMap();
const fireObserverCallback = /* @__PURE__ */ __name((entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
}, "fireObserverCallback");
const fireAllObserverCallbacks = /* @__PURE__ */ __name((entries) => {
  entries.forEach(fireObserverCallback);
}, "fireAllObserverCallbacks");
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
__name(initIntersectionObserver, "initIntersectionObserver");
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}
__name(observeIntersection, "observeIntersection");
const thresholdNames = {
  some: 0,
  all: 1
};
const _InViewFeature = class _InViewFeature extends Feature {
  constructor() {
    super(...arguments);
    this.hasEnteredView = false;
    this.isInView = false;
  }
  startObserver() {
    this.unmount();
    const { viewport = {} } = this.node.getProps();
    const { root, margin: rootMargin, amount = "some", once } = viewport;
    const options = {
      root: root ? root.current : void 0,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const onIntersectionUpdate = /* @__PURE__ */ __name((entry) => {
      const { isIntersecting } = entry;
      if (this.isInView === isIntersecting)
        return;
      this.isInView = isIntersecting;
      if (once && !isIntersecting && this.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        this.hasEnteredView = true;
      }
      if (this.node.animationState) {
        this.node.animationState.setActive("whileInView", isIntersecting);
      }
      const { onViewportEnter, onViewportLeave } = this.node.getProps();
      const callback = isIntersecting ? onViewportEnter : onViewportLeave;
      callback && callback(entry);
    }, "onIntersectionUpdate");
    return observeIntersection(this.node.current, options, onIntersectionUpdate);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === "undefined")
      return;
    const { props, prevProps } = this.node;
    const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
  unmount() {
  }
};
__name(_InViewFeature, "InViewFeature");
let InViewFeature = _InViewFeature;
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
  return (name) => viewport[name] !== prevViewport[name];
}
__name(hasViewportOptionChanged, "hasViewportOptionChanged");
const gestureAnimations = {
  inView: {
    Feature: InViewFeature
  },
  tap: {
    Feature: PressGesture
  },
  focus: {
    Feature: FocusGesture
  },
  hover: {
    Feature: HoverGesture
  }
};
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i2 = 0; i2 < prevLength; i2++) {
    if (prev[i2] !== next[i2])
      return false;
  }
  return true;
}
__name(shallowCompare, "shallowCompare");
function getCurrent(visualElement) {
  const current = {};
  visualElement.values.forEach((value, key) => current[key] = value.get());
  return current;
}
__name(getCurrent, "getCurrent");
function getVelocity$1(visualElement) {
  const velocity = {};
  visualElement.values.forEach((value, key) => velocity[key] = value.getVelocity());
  return velocity;
}
__name(getVelocity$1, "getVelocity$1");
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity$1(visualElement));
}
__name(resolveVariant, "resolveVariant");
let warning = noop;
let invariant = noop;
const secondsToMilliseconds = /* @__PURE__ */ __name((seconds) => seconds * 1e3, "secondsToMilliseconds");
const millisecondsToSeconds = /* @__PURE__ */ __name((milliseconds) => milliseconds / 1e3, "millisecondsToSeconds");
const instantAnimationState = {
  current: false
};
const isBezierDefinition = /* @__PURE__ */ __name((easing) => Array.isArray(easing) && typeof easing[0] === "number", "isBezierDefinition");
function isWaapiSupportedEasing(easing) {
  return Boolean(!easing || typeof easing === "string" && supportedWaapiEasing[easing] || isBezierDefinition(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
__name(isWaapiSupportedEasing, "isWaapiSupportedEasing");
const cubicBezierAsString = /* @__PURE__ */ __name(([a2, b, c2, d2]) => `cubic-bezier(${a2}, ${b}, ${c2}, ${d2})`, "cubicBezierAsString");
const supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};
function mapEasingToNativeEasing(easing) {
  if (!easing)
    return void 0;
  return isBezierDefinition(easing) ? cubicBezierAsString(easing) : Array.isArray(easing) ? easing.map(mapEasingToNativeEasing) : supportedWaapiEasing[easing];
}
__name(mapEasingToNativeEasing, "mapEasingToNativeEasing");
function animateStyle(element, valueName, keyframes2, { delay: delay2 = 0, duration, repeat = 0, repeatType = "loop", ease: ease2, times } = {}) {
  const keyframeOptions = { [valueName]: keyframes2 };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing(ease2);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  return element.animate(keyframeOptions, {
    delay: delay2,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  });
}
__name(animateStyle, "animateStyle");
function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }) {
  const index2 = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : keyframes2.length - 1;
  return keyframes2[index2];
}
__name(getFinalKeyframe, "getFinalKeyframe");
const calcBezier = /* @__PURE__ */ __name((t2, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t2 + (3 * a2 - 6 * a1)) * t2 + 3 * a1) * t2, "calcBezier");
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i2 = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i2 < subdivisionMaxIterations);
  return currentT;
}
__name(binarySubdivide, "binarySubdivide");
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop;
  const getTForX = /* @__PURE__ */ __name((aX) => binarySubdivide(aX, 0, 1, mX1, mX2), "getTForX");
  return (t2) => t2 === 0 || t2 === 1 ? t2 : calcBezier(getTForX(t2), mY1, mY2);
}
__name(cubicBezier, "cubicBezier");
const easeIn = cubicBezier(0.42, 0, 1, 1);
const easeOut = cubicBezier(0, 0, 0.58, 1);
const easeInOut = cubicBezier(0.42, 0, 0.58, 1);
const isEasingArray = /* @__PURE__ */ __name((ease2) => {
  return Array.isArray(ease2) && typeof ease2[0] !== "number";
}, "isEasingArray");
const mirrorEasing = /* @__PURE__ */ __name((easing) => (p2) => p2 <= 0.5 ? easing(2 * p2) / 2 : (2 - easing(2 * (1 - p2))) / 2, "mirrorEasing");
const reverseEasing = /* @__PURE__ */ __name((easing) => (p2) => 1 - easing(1 - p2), "reverseEasing");
const circIn = /* @__PURE__ */ __name((p2) => 1 - Math.sin(Math.acos(p2)), "circIn");
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circIn);
const backOut = cubicBezier(0.33, 1.53, 0.69, 0.99);
const backIn = reverseEasing(backOut);
const backInOut = mirrorEasing(backIn);
const anticipate = /* @__PURE__ */ __name((p2) => (p2 *= 2) < 1 ? 0.5 * backIn(p2) : 0.5 * (2 - Math.pow(2, -10 * (p2 - 1))), "anticipate");
const easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
const easingDefinitionToFunction = /* @__PURE__ */ __name((definition) => {
  if (Array.isArray(definition)) {
    invariant(definition.length === 4);
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
}, "easingDefinitionToFunction");
const isColorString = /* @__PURE__ */ __name((type, testProp) => (v2) => {
  return Boolean(isString(v2) && singleColorRegex.test(v2) && v2.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v2, testProp));
}, "isColorString");
const splitColor = /* @__PURE__ */ __name((aName, bName, cName) => (v2) => {
  if (!isString(v2))
    return v2;
  const [a2, b, c2, alpha2] = v2.match(floatRegex);
  return {
    [aName]: parseFloat(a2),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c2),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
}, "splitColor");
const clampRgbUnit = /* @__PURE__ */ __name((v2) => clamp(0, 255, v2), "clampRgbUnit");
const rgbUnit = {
  ...number,
  transform: (v2) => Math.round(clampRgbUnit(v2))
};
const rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v2) {
  let r = "";
  let g2 = "";
  let b = "";
  let a2 = "";
  if (v2.length > 5) {
    r = v2.substring(1, 3);
    g2 = v2.substring(3, 5);
    b = v2.substring(5, 7);
    a2 = v2.substring(7, 9);
  } else {
    r = v2.substring(1, 2);
    g2 = v2.substring(2, 3);
    b = v2.substring(3, 4);
    a2 = v2.substring(4, 5);
    r += r;
    g2 += g2;
    b += b;
    a2 += a2;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g2, 16),
    blue: parseInt(b, 16),
    alpha: a2 ? parseInt(a2, 16) / 255 : 1
  };
}
__name(parseHex, "parseHex");
const hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};
const hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};
const color = {
  test: (v2) => rgba.test(v2) || hex.test(v2) || hsla.test(v2),
  parse: (v2) => {
    if (rgba.test(v2)) {
      return rgba.parse(v2);
    } else if (hsla.test(v2)) {
      return hsla.parse(v2);
    } else {
      return hex.parse(v2);
    }
  },
  transform: (v2) => {
    return isString(v2) ? v2 : v2.hasOwnProperty("red") ? rgba.transform(v2) : hsla.transform(v2);
  }
};
const mix = /* @__PURE__ */ __name((from, to, progress2) => -progress2 * from + progress2 * to + from, "mix");
function hueToRgb(p2, q2, t2) {
  if (t2 < 0)
    t2 += 1;
  if (t2 > 1)
    t2 -= 1;
  if (t2 < 1 / 6)
    return p2 + (q2 - p2) * 6 * t2;
  if (t2 < 1 / 2)
    return q2;
  if (t2 < 2 / 3)
    return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
  return p2;
}
__name(hueToRgb, "hueToRgb");
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q2 = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p2 = 2 * lightness - q2;
    red = hueToRgb(p2, q2, hue + 1 / 3);
    green = hueToRgb(p2, q2, hue);
    blue = hueToRgb(p2, q2, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}
__name(hslaToRgba, "hslaToRgba");
const mixLinearColor = /* @__PURE__ */ __name((from, to, v2) => {
  const fromExpo = from * from;
  return Math.sqrt(Math.max(0, v2 * (to * to - fromExpo) + fromExpo));
}, "mixLinearColor");
const colorTypes = [hex, rgba, hsla];
const getColorType = /* @__PURE__ */ __name((v2) => colorTypes.find((type) => type.test(v2)), "getColorType");
function asRGBA(color2) {
  const type = getColorType(color2);
  let model = type.parse(color2);
  if (type === hsla) {
    model = hslaToRgba(model);
  }
  return model;
}
__name(asRGBA, "asRGBA");
const mixColor = /* @__PURE__ */ __name((from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  const blended = { ...fromRGBA };
  return (v2) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v2);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v2);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v2);
    blended.alpha = mix(fromRGBA.alpha, toRGBA.alpha, v2);
    return rgba.transform(blended);
  };
}, "mixColor");
function test(v2) {
  var _a, _b;
  return isNaN(v2) && isString(v2) && (((_a = v2.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = v2.match(colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0;
}
__name(test, "test");
const cssVarTokeniser = {
  regex: cssVariableRegex,
  countKey: "Vars",
  token: "${v}",
  parse: noop
};
const colorTokeniser = {
  regex: colorRegex,
  countKey: "Colors",
  token: "${c}",
  parse: color.parse
};
const numberTokeniser = {
  regex: floatRegex,
  countKey: "Numbers",
  token: "${n}",
  parse: number.parse
};
function tokenise(info, { regex, countKey, token, parse }) {
  const matches = info.tokenised.match(regex);
  if (!matches)
    return;
  info["num" + countKey] = matches.length;
  info.tokenised = info.tokenised.replace(regex, token);
  info.values.push(...matches.map(parse));
}
__name(tokenise, "tokenise");
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const info = {
    value: originalValue,
    tokenised: originalValue,
    values: [],
    numVars: 0,
    numColors: 0,
    numNumbers: 0
  };
  if (info.value.includes("var(--"))
    tokenise(info, cssVarTokeniser);
  tokenise(info, colorTokeniser);
  tokenise(info, numberTokeniser);
  return info;
}
__name(analyseComplexValue, "analyseComplexValue");
function parseComplexValue(v2) {
  return analyseComplexValue(v2).values;
}
__name(parseComplexValue, "parseComplexValue");
function createTransformer(source) {
  const { values, numColors, numVars, tokenised } = analyseComplexValue(source);
  const numValues = values.length;
  return (v2) => {
    let output = tokenised;
    for (let i2 = 0; i2 < numValues; i2++) {
      if (i2 < numVars) {
        output = output.replace(cssVarTokeniser.token, v2[i2]);
      } else if (i2 < numVars + numColors) {
        output = output.replace(colorTokeniser.token, color.transform(v2[i2]));
      } else {
        output = output.replace(numberTokeniser.token, sanitize(v2[i2]));
      }
    }
    return output;
  };
}
__name(createTransformer, "createTransformer");
const convertNumbersToZero = /* @__PURE__ */ __name((v2) => typeof v2 === "number" ? 0 : v2, "convertNumbersToZero");
function getAnimatableNone$1(v2) {
  const parsed = parseComplexValue(v2);
  const transformer = createTransformer(v2);
  return transformer(parsed.map(convertNumbersToZero));
}
__name(getAnimatableNone$1, "getAnimatableNone$1");
const complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone: getAnimatableNone$1
};
const mixImmediate = /* @__PURE__ */ __name((origin, target) => (p2) => `${p2 > 0 ? target : origin}`, "mixImmediate");
function getMixer(origin, target) {
  if (typeof origin === "number") {
    return (v2) => mix(origin, target, v2);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return origin.startsWith("var(") ? mixImmediate(origin, target) : mixComplex(origin, target);
  }
}
__name(getMixer, "getMixer");
const mixArray = /* @__PURE__ */ __name((from, to) => {
  const output = [...from];
  const numValues = output.length;
  const blendValue = from.map((fromThis, i2) => getMixer(fromThis, to[i2]));
  return (v2) => {
    for (let i2 = 0; i2 < numValues; i2++) {
      output[i2] = blendValue[i2](v2);
    }
    return output;
  };
}, "mixArray");
const mixObject = /* @__PURE__ */ __name((origin, target) => {
  const output = { ...origin, ...target };
  const blendValue = {};
  for (const key in output) {
    if (origin[key] !== void 0 && target[key] !== void 0) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }
  return (v2) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v2);
    }
    return output;
  };
}, "mixObject");
const mixComplex = /* @__PURE__ */ __name((origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.numVars === targetStats.numVars && originStats.numColors === targetStats.numColors && originStats.numNumbers >= targetStats.numNumbers;
  if (canInterpolate) {
    return pipe(mixArray(originStats.values, targetStats.values), template);
  } else {
    return mixImmediate(origin, target);
  }
}, "mixComplex");
const progress = /* @__PURE__ */ __name((from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
}, "progress");
const mixNumber = /* @__PURE__ */ __name((from, to) => (p2) => mix(from, to, p2), "mixNumber");
function detectMixerFactory(v2) {
  if (typeof v2 === "number") {
    return mixNumber;
  } else if (typeof v2 === "string") {
    return color.test(v2) ? mixColor : mixComplex;
  } else if (Array.isArray(v2)) {
    return mixArray;
  } else if (typeof v2 === "object") {
    return mixObject;
  }
  return mixNumber;
}
__name(detectMixerFactory, "detectMixerFactory");
function createMixers(output, ease2, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || detectMixerFactory(output[0]);
  const numMixers = output.length - 1;
  for (let i2 = 0; i2 < numMixers; i2++) {
    let mixer = mixerFactory(output[i2], output[i2 + 1]);
    if (ease2) {
      const easingFunction = Array.isArray(ease2) ? ease2[i2] || noop : ease2;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
__name(createMixers, "createMixers");
function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length);
  if (inputLength === 1)
    return () => output[0];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease2, mixer);
  const numMixers = mixers.length;
  const interpolator = /* @__PURE__ */ __name((v2) => {
    let i2 = 0;
    if (numMixers > 1) {
      for (; i2 < input.length - 2; i2++) {
        if (v2 < input[i2 + 1])
          break;
      }
    }
    const progressInRange = progress(input[i2], input[i2 + 1], v2);
    return mixers[i2](progressInRange);
  }, "interpolator");
  return isClamp ? (v2) => interpolator(clamp(input[0], input[inputLength - 1], v2)) : interpolator;
}
__name(interpolate, "interpolate");
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i2 = 1; i2 <= remaining; i2++) {
    const offsetProgress = progress(0, remaining, i2);
    offset.push(mix(min, 1, offsetProgress));
  }
}
__name(fillOffset, "fillOffset");
function defaultOffset(arr) {
  const offset = [0];
  fillOffset(offset, arr.length - 1);
  return offset;
}
__name(defaultOffset, "defaultOffset");
function convertOffsetToTimes(offset, duration) {
  return offset.map((o2) => o2 * duration);
}
__name(convertOffsetToTimes, "convertOffsetToTimes");
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
__name(defaultEasing, "defaultEasing");
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t2) => {
      state.value = mapTimeToKeyframe(t2);
      state.done = t2 >= duration;
      return state;
    }
  };
}
__name(keyframes, "keyframes");
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
__name(velocityPerSecond, "velocityPerSecond");
const velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t2, current) {
  const prevT = Math.max(t2 - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t2 - prevT);
}
__name(calcGeneratorVelocity, "calcGeneratorVelocity");
const safeMin = 1e-3;
const minDuration = 0.01;
const maxDuration$1 = 10;
const minDamping = 0.05;
const maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= secondsToMilliseconds(maxDuration$1));
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
  duration = clamp(minDuration, maxDuration$1, millisecondsToSeconds(duration));
  if (dampingRatio < 1) {
    envelope = /* @__PURE__ */ __name((undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a2 = exponentialDecay - velocity;
      const b = calcAngularFreq(undampedFreq2, dampingRatio);
      const c2 = Math.exp(-delta);
      return safeMin - a2 / b * c2;
    }, "envelope");
    derivative = /* @__PURE__ */ __name((undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d2 = delta * velocity + velocity;
      const e2 = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f2 = Math.exp(-delta);
      const g2 = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d2 - e2) * f2) / g2;
    }, "derivative");
  } else {
    envelope = /* @__PURE__ */ __name((undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a2 * b;
    }, "envelope");
    derivative = /* @__PURE__ */ __name((undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b = (velocity - undampedFreq2) * (duration * duration);
      return a2 * b;
    }, "derivative");
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = secondsToMilliseconds(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
__name(findSpring, "findSpring");
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i2 = 1; i2 < rootIterations; i2++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
__name(approximateRoot, "approximateRoot");
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
__name(calcAngularFreq, "calcAngularFreq");
const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
__name(isSpringType, "isSpringType");
function getSpringOptions(options) {
  let springOptions = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = findSpring(options);
    springOptions = {
      ...springOptions,
      ...derived,
      mass: 1
    };
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
__name(getSpringOptions, "getSpringOptions");
function spring({ keyframes: keyframes2, restDelta, restSpeed, ...options }) {
  const origin = keyframes2[0];
  const target = keyframes2[keyframes2.length - 1];
  const state = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
    ...options,
    velocity: -millisecondsToSeconds(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? 0.01 : 2);
  restDelta || (restDelta = isGranularScale ? 5e-3 : 0.5);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    resolveSpring = /* @__PURE__ */ __name((t2) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t2) + initialDelta * Math.cos(angularFreq * t2));
    }, "resolveSpring");
  } else if (dampingRatio === 1) {
    resolveSpring = /* @__PURE__ */ __name((t2) => target - Math.exp(-undampedAngularFreq * t2) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t2), "resolveSpring");
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = /* @__PURE__ */ __name((t2) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
      const freqForT = Math.min(dampedAngularFreq * t2, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    }, "resolveSpring");
  }
  return {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    next: (t2) => {
      const current = resolveSpring(t2);
      if (!isResolvedFromDuration) {
        let currentVelocity = initialVelocity;
        if (t2 !== 0) {
          if (dampingRatio < 1) {
            currentVelocity = calcGeneratorVelocity(resolveSpring, t2, current);
          } else {
            currentVelocity = 0;
          }
        }
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t2 >= duration;
      }
      state.value = state.done ? target : current;
      return state;
    }
  };
}
__name(spring, "spring");
function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
  const origin = keyframes2[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = /* @__PURE__ */ __name((v2) => min !== void 0 && v2 < min || max !== void 0 && v2 > max, "isOutOfBounds");
  const nearestBoundary = /* @__PURE__ */ __name((v2) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v2) < Math.abs(max - v2) ? min : max;
  }, "nearestBoundary");
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = /* @__PURE__ */ __name((t2) => -amplitude * Math.exp(-t2 / timeConstant), "calcDelta");
  const calcLatest = /* @__PURE__ */ __name((t2) => target + calcDelta(t2), "calcLatest");
  const applyFriction = /* @__PURE__ */ __name((t2) => {
    const delta = calcDelta(t2);
    const latest = calcLatest(t2);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  }, "applyFriction");
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = /* @__PURE__ */ __name((t2) => {
    if (!isOutOfBounds(state.value))
      return;
    timeReachedBoundary = t2;
    spring$1 = spring({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: calcGeneratorVelocity(calcLatest, t2, state.value),
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  }, "checkCatchBoundary");
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t2) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t2);
        checkCatchBoundary(t2);
      }
      if (timeReachedBoundary !== void 0 && t2 > timeReachedBoundary) {
        return spring$1.next(t2 - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t2);
        return state;
      }
    }
  };
}
__name(inertia, "inertia");
const frameloopDriver = /* @__PURE__ */ __name((update) => {
  const passTimestamp = /* @__PURE__ */ __name(({ timestamp }) => update(timestamp), "passTimestamp");
  return {
    start: () => frame.update(passTimestamp, true),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData.isProcessing ? frameData.timestamp : performance.now()
  };
}, "frameloopDriver");
const maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}
__name(calcGeneratorDuration, "calcGeneratorDuration");
const types = {
  decay: inertia,
  inertia,
  tween: keyframes,
  keyframes,
  spring
};
function animateValue({ autoplay = true, delay: delay2 = 0, driver = frameloopDriver, keyframes: keyframes$1, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", onPlay, onStop, onComplete, onUpdate, ...options }) {
  let speed = 1;
  let hasStopped = false;
  let resolveFinishedPromise;
  let currentFinishedPromise;
  const updateFinishedPromise = /* @__PURE__ */ __name(() => {
    currentFinishedPromise = new Promise((resolve) => {
      resolveFinishedPromise = resolve;
    });
  }, "updateFinishedPromise");
  updateFinishedPromise();
  let animationDriver;
  const generatorFactory = types[type] || keyframes;
  let mapNumbersToKeyframes;
  if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
    mapNumbersToKeyframes = interpolate([0, 100], keyframes$1, {
      clamp: false
    });
    keyframes$1 = [0, 100];
  }
  const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
  let mirroredGenerator;
  if (repeatType === "mirror") {
    mirroredGenerator = generatorFactory({
      ...options,
      keyframes: [...keyframes$1].reverse(),
      velocity: -(options.velocity || 0)
    });
  }
  let playState = "idle";
  let holdTime = null;
  let startTime = null;
  let cancelTime = null;
  if (generator.calculatedDuration === null && repeat) {
    generator.calculatedDuration = calcGeneratorDuration(generator);
  }
  const { calculatedDuration } = generator;
  let resolvedDuration = Infinity;
  let totalDuration = Infinity;
  if (calculatedDuration !== null) {
    resolvedDuration = calculatedDuration + repeatDelay;
    totalDuration = resolvedDuration * (repeat + 1) - repeatDelay;
  }
  let currentTime = 0;
  const tick = /* @__PURE__ */ __name((timestamp) => {
    if (startTime === null)
      return;
    if (speed > 0)
      startTime = Math.min(startTime, timestamp);
    if (speed < 0)
      startTime = Math.min(timestamp - totalDuration / speed, startTime);
    if (holdTime !== null) {
      currentTime = holdTime;
    } else {
      currentTime = Math.round(timestamp - startTime) * speed;
    }
    const timeWithoutDelay = currentTime - delay2 * (speed >= 0 ? 1 : -1);
    const isInDelayPhase = speed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    currentTime = Math.max(timeWithoutDelay, 0);
    if (playState === "finished" && holdTime === null) {
      currentTime = totalDuration;
    }
    let elapsed = currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress2 = Math.min(currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
    }
    const state = isInDelayPhase ? { done: false, value: keyframes$1[0] } : frameGenerator.next(elapsed);
    if (mapNumbersToKeyframes) {
      state.value = mapNumbersToKeyframes(state.value);
    }
    let { done } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = speed >= 0 ? currentTime >= totalDuration : currentTime <= 0;
    }
    const isAnimationFinished = holdTime === null && (playState === "finished" || playState === "running" && done);
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      finish();
    }
    return state;
  }, "tick");
  const stopAnimationDriver = /* @__PURE__ */ __name(() => {
    animationDriver && animationDriver.stop();
    animationDriver = void 0;
  }, "stopAnimationDriver");
  const cancel = /* @__PURE__ */ __name(() => {
    playState = "idle";
    stopAnimationDriver();
    resolveFinishedPromise();
    updateFinishedPromise();
    startTime = cancelTime = null;
  }, "cancel");
  const finish = /* @__PURE__ */ __name(() => {
    playState = "finished";
    onComplete && onComplete();
    stopAnimationDriver();
    resolveFinishedPromise();
  }, "finish");
  const play = /* @__PURE__ */ __name(() => {
    if (hasStopped)
      return;
    if (!animationDriver)
      animationDriver = driver(tick);
    const now = animationDriver.now();
    onPlay && onPlay();
    if (holdTime !== null) {
      startTime = now - holdTime;
    } else if (!startTime || playState === "finished") {
      startTime = now;
    }
    if (playState === "finished") {
      updateFinishedPromise();
    }
    cancelTime = startTime;
    holdTime = null;
    playState = "running";
    animationDriver.start();
  }, "play");
  if (autoplay) {
    play();
  }
  const controls = {
    then(resolve, reject) {
      return currentFinishedPromise.then(resolve, reject);
    },
    get time() {
      return millisecondsToSeconds(currentTime);
    },
    set time(newTime) {
      newTime = secondsToMilliseconds(newTime);
      currentTime = newTime;
      if (holdTime !== null || !animationDriver || speed === 0) {
        holdTime = newTime;
      } else {
        startTime = animationDriver.now() - newTime / speed;
      }
    },
    get duration() {
      const duration = generator.calculatedDuration === null ? calcGeneratorDuration(generator) : generator.calculatedDuration;
      return millisecondsToSeconds(duration);
    },
    get speed() {
      return speed;
    },
    set speed(newSpeed) {
      if (newSpeed === speed || !animationDriver)
        return;
      speed = newSpeed;
      controls.time = millisecondsToSeconds(currentTime);
    },
    get state() {
      return playState;
    },
    play,
    pause: () => {
      playState = "paused";
      holdTime = currentTime;
    },
    stop: () => {
      hasStopped = true;
      if (playState === "idle")
        return;
      playState = "idle";
      onStop && onStop();
      cancel();
    },
    cancel: () => {
      if (cancelTime !== null)
        tick(cancelTime);
      cancel();
    },
    complete: () => {
      playState = "finished";
    },
    sample: (elapsed) => {
      startTime = 0;
      return tick(elapsed);
    }
  };
  return controls;
}
__name(animateValue, "animateValue");
function memo(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}
__name(memo, "memo");
const supportsWaapi = memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
const acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]);
const sampleDelta = 10;
const maxDuration = 2e4;
const requiresPregeneratedKeyframes = /* @__PURE__ */ __name((valueName, options) => options.type === "spring" || valueName === "backgroundColor" || !isWaapiSupportedEasing(options.ease), "requiresPregeneratedKeyframes");
function createAcceleratedAnimation(value, valueName, { onUpdate, onComplete, ...options }) {
  const canAccelerateAnimation = supportsWaapi() && acceleratedValues.has(valueName) && !options.repeatDelay && options.repeatType !== "mirror" && options.damping !== 0 && options.type !== "inertia";
  if (!canAccelerateAnimation)
    return false;
  let hasStopped = false;
  let resolveFinishedPromise;
  let currentFinishedPromise;
  let pendingCancel = false;
  const updateFinishedPromise = /* @__PURE__ */ __name(() => {
    currentFinishedPromise = new Promise((resolve) => {
      resolveFinishedPromise = resolve;
    });
  }, "updateFinishedPromise");
  updateFinishedPromise();
  let { keyframes: keyframes2, duration = 300, ease: ease2, times } = options;
  if (requiresPregeneratedKeyframes(valueName, options)) {
    const sampleAnimation = animateValue({
      ...options,
      repeat: 0,
      delay: 0
    });
    let state = { done: false, value: keyframes2[0] };
    const pregeneratedKeyframes = [];
    let t2 = 0;
    while (!state.done && t2 < maxDuration) {
      state = sampleAnimation.sample(t2);
      pregeneratedKeyframes.push(state.value);
      t2 += sampleDelta;
    }
    times = void 0;
    keyframes2 = pregeneratedKeyframes;
    duration = t2 - sampleDelta;
    ease2 = "linear";
  }
  const animation = animateStyle(value.owner.current, valueName, keyframes2, {
    ...options,
    duration,
    /**
     * This function is currently not called if ease is provided
     * as a function so the cast is safe.
     *
     * However it would be possible for a future refinement to port
     * in easing pregeneration from Motion One for browsers that
     * support the upcoming `linear()` easing function.
     */
    ease: ease2,
    times
  });
  const cancelAnimation = /* @__PURE__ */ __name(() => {
    pendingCancel = false;
    animation.cancel();
  }, "cancelAnimation");
  const safeCancel = /* @__PURE__ */ __name(() => {
    pendingCancel = true;
    frame.update(cancelAnimation);
    resolveFinishedPromise();
    updateFinishedPromise();
  }, "safeCancel");
  animation.onfinish = () => {
    if (pendingCancel)
      return;
    value.set(getFinalKeyframe(keyframes2, options));
    onComplete && onComplete();
    safeCancel();
  };
  const controls = {
    then(resolve, reject) {
      return currentFinishedPromise.then(resolve, reject);
    },
    attachTimeline(timeline) {
      animation.timeline = timeline;
      animation.onfinish = null;
      return noop;
    },
    get time() {
      return millisecondsToSeconds(animation.currentTime || 0);
    },
    set time(newTime) {
      animation.currentTime = secondsToMilliseconds(newTime);
    },
    get speed() {
      return animation.playbackRate;
    },
    set speed(newSpeed) {
      animation.playbackRate = newSpeed;
    },
    get duration() {
      return millisecondsToSeconds(duration);
    },
    play: () => {
      if (hasStopped)
        return;
      animation.play();
      cancelFrame(cancelAnimation);
    },
    pause: () => animation.pause(),
    stop: () => {
      hasStopped = true;
      if (animation.playState === "idle")
        return;
      const { currentTime } = animation;
      if (currentTime) {
        const sampleAnimation = animateValue({
          ...options,
          autoplay: false
        });
        value.setWithVelocity(sampleAnimation.sample(currentTime - sampleDelta).value, sampleAnimation.sample(currentTime).value, sampleDelta);
      }
      safeCancel();
    },
    complete: () => {
      if (pendingCancel)
        return;
      animation.finish();
    },
    cancel: safeCancel
  };
  return controls;
}
__name(createAcceleratedAnimation, "createAcceleratedAnimation");
function createInstantAnimation({ keyframes: keyframes2, delay: delay2, onUpdate, onComplete }) {
  const setValue = /* @__PURE__ */ __name(() => {
    onUpdate && onUpdate(keyframes2[keyframes2.length - 1]);
    onComplete && onComplete();
    return {
      time: 0,
      speed: 1,
      duration: 0,
      play: noop,
      pause: noop,
      stop: noop,
      then: (resolve) => {
        resolve();
        return Promise.resolve();
      },
      cancel: noop,
      complete: noop
    };
  }, "setValue");
  return delay2 ? animateValue({
    keyframes: [0, 1],
    duration: 0,
    delay: delay2,
    onComplete: setValue
  }) : setValue();
}
__name(createInstantAnimation, "createInstantAnimation");
const underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
const criticallyDampedSpring = /* @__PURE__ */ __name((target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), "criticallyDampedSpring");
const keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
const ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
const getDefaultTransition = /* @__PURE__ */ __name((valueKey, { keyframes: keyframes2 }) => {
  if (keyframes2.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
  }
  return ease;
}, "getDefaultTransition");
const isAnimatable = /* @__PURE__ */ __name((key, value) => {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
}, "isAnimatable");
const maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v2) {
  const [name, value] = v2.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v2;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v2;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
__name(applyDefaultFilter, "applyDefaultFilter");
const functionRegex = /([a-z-]*)\(.*?\)/g;
const filter = {
  ...complex,
  getAnimatableNone: (v2) => {
    const functions = v2.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v2;
  }
};
const defaultValueTypes = {
  ...numberValueTypes,
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
};
const getDefaultValueType = /* @__PURE__ */ __name((key) => defaultValueTypes[key], "getDefaultValueType");
function getAnimatableNone(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
__name(getAnimatableNone, "getAnimatableNone");
const isZeroValueString = /* @__PURE__ */ __name((v2) => /^0[^.\s]+$/.test(v2), "isZeroValueString");
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  }
}
__name(isNone, "isNone");
function getKeyframes(value, valueName, target, transition) {
  const isTargetAnimatable = isAnimatable(valueName, target);
  let keyframes2;
  if (Array.isArray(target)) {
    keyframes2 = [...target];
  } else {
    keyframes2 = [null, target];
  }
  const defaultOrigin = transition.from !== void 0 ? transition.from : value.get();
  let animatableTemplateValue = void 0;
  const noneKeyframeIndexes = [];
  for (let i2 = 0; i2 < keyframes2.length; i2++) {
    if (keyframes2[i2] === null) {
      keyframes2[i2] = i2 === 0 ? defaultOrigin : keyframes2[i2 - 1];
    }
    if (isNone(keyframes2[i2])) {
      noneKeyframeIndexes.push(i2);
    }
    if (typeof keyframes2[i2] === "string" && keyframes2[i2] !== "none" && keyframes2[i2] !== "0") {
      animatableTemplateValue = keyframes2[i2];
    }
  }
  if (isTargetAnimatable && noneKeyframeIndexes.length && animatableTemplateValue) {
    for (let i2 = 0; i2 < noneKeyframeIndexes.length; i2++) {
      const index2 = noneKeyframeIndexes[i2];
      keyframes2[index2] = getAnimatableNone(valueName, animatableTemplateValue);
    }
  }
  return keyframes2;
}
__name(getKeyframes, "getKeyframes");
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
  return !!Object.keys(transition).length;
}
__name(isTransitionDefined, "isTransitionDefined");
function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
__name(getValueTransition, "getValueTransition");
const MotionGlobalConfig = {
  skipAnimations: false
};
const animateMotionValue = /* @__PURE__ */ __name((valueName, value, target, transition = {}) => {
  return (onComplete) => {
    const valueTransition = getValueTransition(transition, valueName) || {};
    const delay2 = valueTransition.delay || transition.delay || 0;
    let { elapsed = 0 } = transition;
    elapsed = elapsed - secondsToMilliseconds(delay2);
    const keyframes2 = getKeyframes(value, valueName, target, valueTransition);
    const originKeyframe = keyframes2[0];
    const targetKeyframe = keyframes2[keyframes2.length - 1];
    const isOriginAnimatable = isAnimatable(valueName, originKeyframe);
    const isTargetAnimatable = isAnimatable(valueName, targetKeyframe);
    let options = {
      keyframes: keyframes2,
      velocity: value.getVelocity(),
      ease: "easeOut",
      ...valueTransition,
      delay: -elapsed,
      onUpdate: (v2) => {
        value.set(v2);
        valueTransition.onUpdate && valueTransition.onUpdate(v2);
      },
      onComplete: () => {
        onComplete();
        valueTransition.onComplete && valueTransition.onComplete();
      }
    };
    if (!isTransitionDefined(valueTransition)) {
      options = {
        ...options,
        ...getDefaultTransition(valueName, options)
      };
    }
    if (options.duration) {
      options.duration = secondsToMilliseconds(options.duration);
    }
    if (options.repeatDelay) {
      options.repeatDelay = secondsToMilliseconds(options.repeatDelay);
    }
    if (!isOriginAnimatable || !isTargetAnimatable || instantAnimationState.current || valueTransition.type === false || MotionGlobalConfig.skipAnimations) {
      return createInstantAnimation(options);
    }
    if (
      /**
       * If this is a handoff animation, the optimised animation will be running via
       * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
       * optimised animation.
       */
      !transition.isHandoff && value.owner && value.owner.current instanceof HTMLElement && /**
       * If we're outputting values to onUpdate then we can't use WAAPI as there's
       * no way to read the value from WAAPI every frame.
       */
      !value.owner.getProps().onUpdate
    ) {
      const acceleratedAnimation = createAcceleratedAnimation(value, valueName, options);
      if (acceleratedAnimation)
        return acceleratedAnimation;
    }
    return animateValue(options);
  };
}, "animateMotionValue");
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}
__name(isWillChangeMotionValue, "isWillChangeMotionValue");
const isNumericalString = /* @__PURE__ */ __name((v2) => /^\-?\d*\.?\d+$/.test(v2), "isNumericalString");
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
__name(addUniqueItem, "addUniqueItem");
function removeItem(arr, item) {
  const index2 = arr.indexOf(item);
  if (index2 > -1)
    arr.splice(index2, 1);
}
__name(removeItem, "removeItem");
const _SubscriptionManager = class _SubscriptionManager {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a2, b, c2) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a2, b, c2);
    } else {
      for (let i2 = 0; i2 < numSubscriptions; i2++) {
        const handler = this.subscriptions[i2];
        handler && handler(a2, b, c2);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};
__name(_SubscriptionManager, "SubscriptionManager");
let SubscriptionManager = _SubscriptionManager;
const isFloat = /* @__PURE__ */ __name((value) => {
  return !isNaN(parseFloat(value));
}, "isFloat");
const _MotionValue = class _MotionValue {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(init, options = {}) {
    this.version = "10.18.0";
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.canTrackVelocity = false;
    this.events = {};
    this.updateAndNotify = (v2, render = true) => {
      this.prev = this.current;
      this.current = v2;
      const { delta, timestamp } = frameData;
      if (this.lastUpdated !== timestamp) {
        this.timeDelta = delta;
        this.lastUpdated = timestamp;
        frame.postRender(this.scheduleVelocityCheck);
      }
      if (this.prev !== this.current && this.events.change) {
        this.events.change.notify(this.current);
      }
      if (this.events.velocityChange) {
        this.events.velocityChange.notify(this.getVelocity());
      }
      if (render && this.events.renderRequest) {
        this.events.renderRequest.notify(this.current);
      }
    };
    this.scheduleVelocityCheck = () => frame.postRender(this.velocityCheck);
    this.velocityCheck = ({ timestamp }) => {
      if (timestamp !== this.lastUpdated) {
        this.prev = this.current;
        if (this.events.velocityChange) {
          this.events.velocityChange.notify(this.getVelocity());
        }
      }
    };
    this.hasAnimated = false;
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
    this.owner = options.owner;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v2, render = true) {
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v2, render);
    } else {
      this.passiveEffect(v2, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = prev;
    this.timeDelta = delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v2) {
    this.updateAndNotify(v2);
    this.prev = v2;
    this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    return this.canTrackVelocity ? (
      // These casts could be avoided if parseFloat would be typed better
      velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
    ) : 0;
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
};
__name(_MotionValue, "MotionValue");
let MotionValue = _MotionValue;
function motionValue(init, options) {
  return new MotionValue(init, options);
}
__name(motionValue, "motionValue");
const testValueType = /* @__PURE__ */ __name((v2) => (type) => type.test(v2), "testValueType");
const auto = {
  test: (v2) => v2 === "auto",
  parse: (v2) => v2
};
const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
const findDimensionValueType = /* @__PURE__ */ __name((v2) => dimensionValueTypes.find(testValueType(v2)), "findDimensionValueType");
const valueTypes = [...dimensionValueTypes, color, complex];
const findValueType = /* @__PURE__ */ __name((v2) => valueTypes.find(testValueType(v2)), "findValueType");
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
__name(setMotionValue, "setMotionValue");
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved ? visualElement.makeTargetAnimatable(resolved, false) : {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}
__name(setTarget, "setTarget");
function checkTargetForNewValues(visualElement, target, origin) {
  var _a, _b;
  const newValueKeys = Object.keys(target).filter((key) => !visualElement.hasValue(key));
  const numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (let i2 = 0; i2 < numNewValues; i2++) {
    const key = newValueKeys[i2];
    const targetValue = target[key];
    let value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone(key, targetValue);
    }
    visualElement.addValue(key, motionValue(value, { owner: visualElement }));
    if (origin[key] === void 0) {
      origin[key] = value;
    }
    if (value !== null)
      visualElement.setBaseTarget(key, value);
  }
}
__name(checkTargetForNewValues, "checkTargetForNewValues");
function getOriginFromTransition(key, transition) {
  if (!transition)
    return;
  const valueTransition = transition[key] || transition["default"] || transition;
  return valueTransition.from;
}
__name(getOriginFromTransition, "getOriginFromTransition");
function getOrigin(target, transition, visualElement) {
  const origin = {};
  for (const key in target) {
    const transitionOrigin = getOriginFromTransition(key, transition);
    if (transitionOrigin !== void 0) {
      origin[key] = transitionOrigin;
    } else {
      const value = visualElement.getValue(key);
      if (value) {
        origin[key] = value.get();
      }
    }
  }
  return origin;
}
__name(getOrigin, "getOrigin");
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
__name(shouldBlockAnimation, "shouldBlockAnimation");
function hasKeyframesChanged(value, target) {
  const current = value.get();
  if (Array.isArray(target)) {
    for (let i2 = 0; i2 < target.length; i2++) {
      if (target[i2] !== current)
        return true;
    }
  } else {
    return current !== target;
  }
}
__name(hasKeyframesChanged, "hasKeyframesChanged");
function animateTarget(visualElement, definition, { delay: delay2 = 0, transitionOverride, type } = {}) {
  let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = visualElement.makeTargetAnimatable(definition);
  const willChange = visualElement.getValue("willChange");
  if (transitionOverride)
    transition = transitionOverride;
  const animations2 = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key);
    const valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay: delay2,
      elapsed: 0,
      ...getValueTransition(transition || {}, key)
    };
    if (window.HandoffAppearAnimations) {
      const appearId = visualElement.getProps()[optimizedAppearDataAttribute];
      if (appearId) {
        const elapsed = window.HandoffAppearAnimations(appearId, key, value, frame);
        if (elapsed !== null) {
          valueTransition.elapsed = elapsed;
          valueTransition.isHandoff = true;
        }
      }
    }
    let canSkip = !valueTransition.isHandoff && !hasKeyframesChanged(value, valueTarget);
    if (valueTransition.type === "spring" && (value.getVelocity() || valueTransition.velocity)) {
      canSkip = false;
    }
    if (value.animation) {
      canSkip = false;
    }
    if (canSkip)
      continue;
    value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && transformProps.has(key) ? { type: false } : valueTransition));
    const animation = value.animation;
    if (isWillChangeMotionValue(willChange)) {
      willChange.add(key);
      animation.then(() => willChange.remove(key));
    }
    animations2.push(animation);
  }
  if (transitionEnd) {
    Promise.all(animations2).then(() => {
      transitionEnd && setTarget(visualElement, transitionEnd);
    });
  }
  return animations2;
}
__name(animateTarget, "animateTarget");
function animateVariant(visualElement, variant, options = {}) {
  const resolved = resolveVariant(visualElement, variant, options.custom);
  let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
  const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
    return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
    return first().then(() => last());
  } else {
    return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
  }
}
__name(animateVariant, "animateVariant");
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations2 = [];
  const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i2 = 0) => i2 * staggerChildren : (i2 = 0) => maxStaggerDuration - i2 * staggerChildren;
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i2) => {
    child.notify("AnimationStart", variant);
    animations2.push(animateVariant(child, variant, {
      ...options,
      delay: delayChildren + generateStaggerDuration(i2)
    }).then(() => child.notify("AnimationComplete", variant)));
  });
  return Promise.all(animations2);
}
__name(animateChildren, "animateChildren");
function sortByTreeOrder(a2, b) {
  return a2.sortNodePosition(b);
}
__name(sortByTreeOrder, "sortByTreeOrder");
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
  }
  return animation.then(() => visualElement.notify("AnimationComplete", definition));
}
__name(animateVisualElement, "animateVisualElement");
const reversePriorityOrder = [...variantPriorityOrder].reverse();
const numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
  return (animations2) => Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
__name(animateList, "animateList");
function createAnimationState(visualElement) {
  let animate = animateList(visualElement);
  const state = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = /* @__PURE__ */ __name((acc, definition) => {
    const resolved = resolveVariant(visualElement, definition);
    if (resolved) {
      const { transition, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  }, "buildResolvedTypeValues");
  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  __name(setAnimateFunction, "setAnimateFunction");
  function animateChanges(options, changedActiveType) {
    const props = visualElement.getProps();
    const context = visualElement.getVariantContext(true) || {};
    const animations2 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i2 = 0; i2 < numAnimationTypes; i2++) {
      const type = reversePriorityOrder[i2];
      const typeState = state[type];
      const prop = props[type] !== void 0 ? props[type] : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i2;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls(prop) || typeof prop === "boolean"
      ) {
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i2 > removedVariantIndex && propIsVariant;
      let handledRemovedValues = false;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = /* @__PURE__ */ __name((key) => {
        shouldAnimateType = true;
        if (removedKeys.has(key)) {
          handledRemovedValues = true;
          removedKeys.delete(key);
        }
        typeState.needsAnimating[key] = true;
      }, "markToAnimate");
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        let valueHasChanged = false;
        if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
          valueHasChanged = !shallowCompare(next, prev);
        } else {
          valueHasChanged = next !== prev;
        }
        if (valueHasChanged) {
          if (next !== void 0) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && (!isInherited || handledRemovedValues)) {
        animations2.push(...definitionList.map((animation) => ({
          animation,
          options: { type, ...options }
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate(animations2) : Promise.resolve();
  }
  __name(animateChanges, "animateChanges");
  function setActive(type, isActive, options) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    const animations2 = animateChanges(options, type);
    for (const key in state) {
      state[key].protectedKeys = {};
    }
    return animations2;
  }
  __name(setActive, "setActive");
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state
  };
}
__name(createAnimationState, "createAnimationState");
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (Array.isArray(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
__name(checkVariantsDidChange, "checkVariantsDidChange");
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
__name(createTypeState, "createTypeState");
function createState() {
  return {
    animate: createTypeState(true),
    whileInView: createTypeState(),
    whileHover: createTypeState(),
    whileTap: createTypeState(),
    whileDrag: createTypeState(),
    whileFocus: createTypeState(),
    exit: createTypeState()
  };
}
__name(createState, "createState");
const _AnimationFeature = class _AnimationFeature extends Feature {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(node) {
    super(node);
    node.animationState || (node.animationState = createAnimationState(node));
  }
  updateAnimationControlsSubscription() {
    const { animate } = this.node.getProps();
    this.unmount();
    if (isAnimationControls(animate)) {
      this.unmount = animate.subscribe(this.node);
    }
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate } = this.node.getProps();
    const { animate: prevAnimate } = this.node.prevProps || {};
    if (animate !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
  }
};
__name(_AnimationFeature, "AnimationFeature");
let AnimationFeature = _AnimationFeature;
let id$1 = 0;
const _ExitAnimationFeature = class _ExitAnimationFeature extends Feature {
  constructor() {
    super(...arguments);
    this.id = id$1++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent, onExitComplete, custom } = this.node.presenceContext;
    const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || isPresent === prevIsPresent) {
      return;
    }
    const exitAnimation = this.node.animationState.setActive("exit", !isPresent, { custom: custom !== null && custom !== void 0 ? custom : this.node.getProps().custom });
    if (onExitComplete && !isPresent) {
      exitAnimation.then(() => onExitComplete(this.id));
    }
  }
  mount() {
    const { register } = this.node.presenceContext || {};
    if (register) {
      this.unmount = register(this.id);
    }
  }
  unmount() {
  }
};
__name(_ExitAnimationFeature, "ExitAnimationFeature");
let ExitAnimationFeature = _ExitAnimationFeature;
const animations = {
  animation: {
    Feature: AnimationFeature
  },
  exit: {
    Feature: ExitAnimationFeature
  }
};
const distance = /* @__PURE__ */ __name((a2, b) => Math.abs(a2 - b), "distance");
function distance2D(a2, b) {
  const xDelta = distance(a2.x, b.x);
  const yDelta = distance(a2.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
__name(distance2D, "distance2D");
const _PanSession = class _PanSession {
  constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.contextWindow = window;
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = frameData;
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      frame.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin)
        resumeAnimation && resumeAnimation();
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const panInfo = getPanInfo(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer(event))
      return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    this.contextWindow = contextWindow || window;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelFrame(this.updatePoint);
  }
};
__name(_PanSession, "PanSession");
let PanSession = _PanSession;
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
__name(transformPoint, "transformPoint");
function subtractPoint(a2, b) {
  return { x: a2.x - b.x, y: a2.y - b.y };
}
__name(subtractPoint, "subtractPoint");
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
__name(getPanInfo, "getPanInfo");
function startDevicePoint(history) {
  return history[0];
}
__name(startDevicePoint, "startDevicePoint");
function lastDevicePoint(history) {
  return history[history.length - 1];
}
__name(lastDevicePoint, "lastDevicePoint");
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i2 = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i2 >= 0) {
    timestampedPoint = history[i2];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i2--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
__name(getVelocity, "getVelocity");
function calcLength(axis) {
  return axis.max - axis.min;
}
__name(calcLength, "calcLength");
function isNear(value, target = 0, maxDistance = 0.01) {
  return Math.abs(value - target) <= maxDistance;
}
__name(isNear, "isNear");
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mix(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
    delta.scale = 1;
  delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
  if (isNear(delta.translate) || isNaN(delta.translate))
    delta.translate = 0;
}
__name(calcAxisDelta, "calcAxisDelta");
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
  calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
__name(calcBoxDelta, "calcBoxDelta");
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
__name(calcRelativeAxis, "calcRelativeAxis");
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
__name(calcRelativeBox, "calcRelativeBox");
function calcRelativeAxisPosition(target, layout2, parent) {
  target.min = layout2.min - parent.min;
  target.max = target.min + calcLength(layout2);
}
__name(calcRelativeAxisPosition, "calcRelativeAxisPosition");
function calcRelativePosition(target, layout2, parent) {
  calcRelativeAxisPosition(target.x, layout2.x, parent.x);
  calcRelativeAxisPosition(target.y, layout2.y, parent.y);
}
__name(calcRelativePosition, "calcRelativePosition");
function applyConstraints(point, { min, max }, elastic) {
  if (min !== void 0 && point < min) {
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
__name(applyConstraints, "applyConstraints");
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
__name(calcRelativeAxisConstraints, "calcRelativeAxisConstraints");
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
__name(calcRelativeConstraints, "calcRelativeConstraints");
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
__name(calcViewportAxisConstraints, "calcViewportAxisConstraints");
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
__name(calcViewportConstraints, "calcViewportConstraints");
function calcOrigin(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
__name(calcOrigin, "calcOrigin");
function rebaseAxisConstraints(layout2, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout2.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout2.min;
  }
  return relativeConstraints;
}
__name(rebaseAxisConstraints, "rebaseAxisConstraints");
const defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
__name(resolveDragElastic, "resolveDragElastic");
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
__name(resolveAxisElastic, "resolveAxisElastic");
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
__name(resolvePointElastic, "resolvePointElastic");
const createAxisDelta = /* @__PURE__ */ __name(() => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), "createAxisDelta");
const createDelta = /* @__PURE__ */ __name(() => ({
  x: createAxisDelta(),
  y: createAxisDelta()
}), "createDelta");
const createAxis = /* @__PURE__ */ __name(() => ({ min: 0, max: 0 }), "createAxis");
const createBox = /* @__PURE__ */ __name(() => ({
  x: createAxis(),
  y: createAxis()
}), "createBox");
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}
__name(eachAxis, "eachAxis");
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
__name(convertBoundingBoxToBox, "convertBoundingBoxToBox");
function convertBoxToBoundingBox({ x, y }) {
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
__name(convertBoxToBoundingBox, "convertBoxToBoundingBox");
function transformBoxPoints(point, transformPoint2) {
  if (!transformPoint2)
    return point;
  const topLeft = transformPoint2({ x: point.left, y: point.top });
  const bottomRight = transformPoint2({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
__name(transformBoxPoints, "transformBoxPoints");
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
__name(isIdentityScale, "isIdentityScale");
function hasScale({ scale: scale2, scaleX, scaleY }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
__name(hasScale, "hasScale");
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY;
}
__name(hasTransform, "hasTransform");
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
__name(has2DTranslate, "has2DTranslate");
function is2DTranslate(value) {
  return value && value !== "0%";
}
__name(is2DTranslate, "is2DTranslate");
function scalePoint(point, scale2, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
__name(scalePoint, "scalePoint");
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
__name(applyPointDelta, "applyPointDelta");
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
__name(applyAxisDelta, "applyAxisDelta");
function applyBoxDelta(box, { x, y }) {
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
__name(applyBoxDelta, "applyBoxDelta");
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i2 = 0; i2 < treeLength; i2++) {
    node = treePath[i2];
    delta = node.projectionDelta;
    const instance = node.instance;
    if (instance && instance.style && instance.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, {
        x: -node.scroll.offset.x,
        y: -node.scroll.offset.y
      });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
  treeScale.x = snapToDefault(treeScale.x);
  treeScale.y = snapToDefault(treeScale.y);
}
__name(applyTreeDeltas, "applyTreeDeltas");
function snapToDefault(scale2) {
  if (Number.isInteger(scale2))
    return scale2;
  return scale2 > 1.0000000000001 || scale2 < 0.999999999999 ? scale2 : 1;
}
__name(snapToDefault, "snapToDefault");
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
__name(translateAxis, "translateAxis");
function transformAxis(axis, transforms, [key, scaleKey, originKey]) {
  const axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
  const originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
__name(transformAxis, "transformAxis");
const xKeys$1 = ["x", "scaleX", "originX"];
const yKeys$1 = ["y", "scaleY", "originY"];
function transformBox(box, transform) {
  transformAxis(box.x, transform, xKeys$1);
  transformAxis(box.y, transform, yKeys$1);
}
__name(transformBox, "transformBox");
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
__name(measureViewportBox, "measureViewportBox");
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll } = rootProjectionNode2;
  if (scroll) {
    translateAxis(viewportBox.x, scroll.offset.x);
    translateAxis(viewportBox.y, scroll.offset.y);
  }
  return viewportBox;
}
__name(measurePageBox, "measurePageBox");
const getContextWindow = /* @__PURE__ */ __name(({ current }) => {
  return current ? current.ownerDocument.defaultView : null;
}, "getContextWindow");
const elementDragControls = /* @__PURE__ */ new WeakMap();
const _VisualElementDragControls = class _VisualElementDragControls {
  constructor(visualElement) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    const { presenceContext } = this.visualElement;
    if (presenceContext && presenceContext.isPresent === false)
      return;
    const onSessionStart = /* @__PURE__ */ __name((event) => {
      const { dragSnapToOrigin: dragSnapToOrigin2 } = this.getProps();
      dragSnapToOrigin2 ? this.pauseAnimation() : this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event, "page").point);
      }
    }, "onSessionStart");
    const onStart = /* @__PURE__ */ __name((event, info) => {
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openGlobalLock)
          this.openGlobalLock();
        this.openGlobalLock = getGlobalLock(drag2);
        if (!this.openGlobalLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length = calcLength(measuredAxis);
              current = length * (parseFloat(current) / 100);
            }
          }
        }
        this.originPoint[axis] = current;
      });
      if (onDragStart) {
        frame.update(() => onDragStart(event, info), false, true);
      }
      const { animationState } = this.visualElement;
      animationState && animationState.setActive("whileDrag", true);
    }, "onStart");
    const onMove = /* @__PURE__ */ __name((event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openGlobalLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      onDrag && onDrag(event, info);
    }, "onMove");
    const onSessionEnd = /* @__PURE__ */ __name((event, info) => this.stop(event, info), "onSessionEnd");
    const resumeAnimation = /* @__PURE__ */ __name(() => eachAxis((axis) => {
      var _a;
      return this.getAnimationState(axis) === "paused" && ((_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.play());
    }), "resumeAnimation");
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd,
      resumeAnimation
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin,
      contextWindow: getContextWindow(this.visualElement)
    });
  }
  stop(event, info) {
    const isDragging = this.isDragging;
    this.cancel();
    if (!isDragging)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd) {
      frame.update(() => onDragEnd(event, info));
    }
  }
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.panSession && this.panSession.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    animationState && animationState.setActive("whileDrag", false);
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag2 } = this.getProps();
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    var _a;
    const { dragConstraints, dragElastic } = this.getProps();
    const layout2 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : (_a = this.visualElement.projection) === null || _a === void 0 ? void 0 : _a.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout2) {
        this.constraints = calcRelativeConstraints(layout2.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout2 && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout2.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition = constraints && constraints[axis] || {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    return axisValue.start(animateMotionValue(axis, axisValue, 0, transition));
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  pauseAnimation() {
    eachAxis((axis) => {
      var _a;
      return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.pause();
    });
  }
  getAnimationState(axis) {
    var _a;
    return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(axis) {
    const dragKey = "_drag" + axis.toUpperCase();
    const props = this.visualElement.getProps();
    const externalMotionValue = props[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        axisValue.set(point[axis] - mix(min, max, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mix(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      drag2 && dragListener && this.start(event);
    });
    const measureDragConstraints = /* @__PURE__ */ __name(() => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints)) {
        this.constraints = this.resolveRefConstraints();
      }
    }, "measureDragConstraints");
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    measureDragConstraints();
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue2 = this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    });
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
};
__name(_VisualElementDragControls, "VisualElementDragControls");
let VisualElementDragControls = _VisualElementDragControls;
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
__name(shouldDrag, "shouldDrag");
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
__name(getCurrentDirection, "getCurrentDirection");
const _DragGesture = class _DragGesture extends Feature {
  constructor(node) {
    super(node);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(node);
  }
  mount() {
    const { dragControls } = this.node.getProps();
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
};
__name(_DragGesture, "DragGesture");
let DragGesture = _DragGesture;
const asyncHandler = /* @__PURE__ */ __name((handler) => (event, info) => {
  if (handler) {
    frame.update(() => handler(event, info));
  }
}, "asyncHandler");
const _PanGesture = class _PanGesture extends Feature {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: getContextWindow(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
    return {
      onSessionStart: asyncHandler(onPanSessionStart),
      onStart: asyncHandler(onPanStart),
      onMove: onPan,
      onEnd: (event, info) => {
        delete this.session;
        if (onPanEnd) {
          frame.update(() => onPanEnd(event, info));
        }
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
};
__name(_PanGesture, "PanGesture");
let PanGesture = _PanGesture;
function usePresence() {
  const context = reactExports.useContext(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent, onExitComplete, register } = context;
  const id2 = reactExports.useId();
  reactExports.useEffect(() => register(id2), []);
  const safeToRemove = /* @__PURE__ */ __name(() => onExitComplete && onExitComplete(id2), "safeToRemove");
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
__name(usePresence, "usePresence");
const globalProjectionState = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: true,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: false
};
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
__name(pixelsToPercent, "pixelsToPercent");
const correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent(latest, node.target.x);
    const y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};
const correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mix(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    return template(shadow);
  }
};
const _MeasureLayoutWithContext = class _MeasureLayoutWithContext extends React$1.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement, drag: drag2, isPresent } = this.props;
    const projection = visualElement.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        frame.postRender(() => {
          const stack = projection.getStack();
          if (!stack || !stack.members.length) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { projection } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      queueMicrotask(() => {
        if (!projection.currentAnimation && projection.isLead()) {
          this.safeToRemove();
        }
      });
    }
  }
  componentWillUnmount() {
    const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup && layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext && promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
};
__name(_MeasureLayoutWithContext, "MeasureLayoutWithContext");
let MeasureLayoutWithContext = _MeasureLayoutWithContext;
function MeasureLayout(props) {
  const [isPresent, safeToRemove] = usePresence();
  const layoutGroup = reactExports.useContext(LayoutGroupContext);
  return React$1.createElement(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: reactExports.useContext(SwitchLayoutGroupContext), isPresent, safeToRemove });
}
__name(MeasureLayout, "MeasureLayout");
const defaultScaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};
const borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
const numBorders = borders.length;
const asNumber = /* @__PURE__ */ __name((value) => typeof value === "string" ? parseFloat(value) : value, "asNumber");
const isPx = /* @__PURE__ */ __name((value) => typeof value === "number" || px.test(value), "isPx");
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  if (shouldCrossfadeOpacity) {
    target.opacity = mix(
      0,
      // TODO Reinstate this if only child
      lead.opacity !== void 0 ? lead.opacity : 1,
      easeCrossfadeIn(progress2)
    );
    target.opacityExit = mix(follow.opacity !== void 0 ? follow.opacity : 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mix(follow.opacity !== void 0 ? follow.opacity : 1, lead.opacity !== void 0 ? lead.opacity : 1, progress2);
  }
  for (let i2 = 0; i2 < numBorders; i2++) {
    const borderLabel = `border${borders[i2]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
__name(mixValues, "mixValues");
function getRadius(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
__name(getRadius, "getRadius");
const easeCrossfadeIn = compress(0, 0.5, circOut);
const easeCrossfadeOut = compress(0.5, 0.95, noop);
function compress(min, max, easing) {
  return (p2) => {
    if (p2 < min)
      return 0;
    if (p2 > max)
      return 1;
    return easing(progress(min, max, p2));
  };
}
__name(compress, "compress");
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
__name(copyAxisInto, "copyAxisInto");
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}
__name(copyBoxInto, "copyBoxInto");
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
__name(removePointDelta, "removePointDelta");
function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mix(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mix(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
__name(removeAxisDelta, "removeAxisDelta");
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
__name(removeAxisTransforms, "removeAxisTransforms");
const xKeys = ["x", "scaleX", "originX"];
const yKeys = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
  removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}
__name(removeBoxTransforms, "removeBoxTransforms");
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
__name(isAxisDeltaZero, "isAxisDeltaZero");
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
__name(isDeltaZero, "isDeltaZero");
function boxEquals(a2, b) {
  return a2.x.min === b.x.min && a2.x.max === b.x.max && a2.y.min === b.y.min && a2.y.max === b.y.max;
}
__name(boxEquals, "boxEquals");
function boxEqualsRounded(a2, b) {
  return Math.round(a2.x.min) === Math.round(b.x.min) && Math.round(a2.x.max) === Math.round(b.x.max) && Math.round(a2.y.min) === Math.round(b.y.min) && Math.round(a2.y.max) === Math.round(b.y.max);
}
__name(boxEqualsRounded, "boxEqualsRounded");
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
__name(aspectRatio, "aspectRatio");
const _NodeStack = class _NodeStack {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i2 = indexOfNode; i2 >= 0; i2--) {
      const member = this.members[i2];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node, preserveFollowOpacity) {
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
      }
      if (node.root && node.root.isUpdating) {
        node.isLayoutDirty = true;
      }
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      const { options, resumingFrom } = node;
      options.onExitComplete && options.onExitComplete();
      if (resumingFrom) {
        resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
      }
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
};
__name(_NodeStack, "NodeStack");
let NodeStack = _NodeStack;
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  if (xTranslate || yTranslate) {
    transform = `translate3d(${xTranslate}px, ${yTranslate}px, 0) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { rotate, rotateX, rotateY } = latestTransform;
    if (rotate)
      transform += `rotate(${rotate}deg) `;
    if (rotateX)
      transform += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform += `rotateY(${rotateY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform || "none";
}
__name(buildProjectionTransform, "buildProjectionTransform");
const compareByDepth = /* @__PURE__ */ __name((a2, b) => a2.depth - b.depth, "compareByDepth");
const _FlatTree = class _FlatTree {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
};
__name(_FlatTree, "FlatTree");
let FlatTree = _FlatTree;
function delay(callback, timeout) {
  const start = performance.now();
  const checkElapsed = /* @__PURE__ */ __name(({ timestamp }) => {
    const elapsed = timestamp - start;
    if (elapsed >= timeout) {
      cancelFrame(checkElapsed);
      callback(elapsed - timeout);
    }
  }, "checkElapsed");
  frame.read(checkElapsed, true);
  return () => cancelFrame(checkElapsed);
}
__name(delay, "delay");
function record(data) {
  if (window.MotionDebug) {
    window.MotionDebug.record(data);
  }
}
__name(record, "record");
function isSVGElement(element) {
  return element instanceof SVGElement && element.tagName !== "svg";
}
__name(isSVGElement, "isSVGElement");
function animateSingleValue(value, keyframes2, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options));
  return motionValue$1.animation;
}
__name(animateSingleValue, "animateSingleValue");
const transformAxes = ["", "X", "Y", "Z"];
const hiddenVisibility = { visibility: "hidden" };
const animationTarget = 1e3;
let id = 0;
const projectionFrameData = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0
};
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  var _a;
  return _a = class {
    constructor(latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
      this.id = id++;
      this.animationId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isProjectionDirty = false;
      this.isSharedProjectionDirty = false;
      this.isTransformDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.hasTreeAnimated = false;
      this.updateScheduled = false;
      this.projectionUpdateScheduled = false;
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.projectionUpdateScheduled = false;
        projectionFrameData.totalNodes = projectionFrameData.resolvedTargetDeltas = projectionFrameData.recalculatedProjection = 0;
        this.nodes.forEach(propagateDirtyNodes);
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
        this.nodes.forEach(cleanDirtyNodes);
        record(projectionFrameData);
      };
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      for (let i2 = 0; i2 < this.path.length; i2++) {
        this.path[i2].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    /**
     * Lifecycles
     */
    mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = isSVGElement(instance);
      this.instance = instance;
      const { layoutId, layout: layout2, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      this.parent && this.parent.children.add(this);
      if (isLayoutDirty && (layout2 || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        const resizeUnblockUpdate = /* @__PURE__ */ __name(() => this.root.updateBlockedByResize = false, "resizeUnblockUpdate");
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout2)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const targetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout) || hasRelativeTargetChanged;
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
          if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = {
              ...getValueTransition(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged) {
              finishAnimation(this);
            }
            if (this.isLead() && this.options.onExitComplete) {
              this.options.onExitComplete();
            }
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      const stack = this.getStack();
      stack && stack.remove(this);
      this.parent && this.parent.children.delete(this);
      this.instance = void 0;
      cancelFrame(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    // Note: currently only running on root node
    startUpdate() {
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      this.nodes && this.nodes.forEach(resetRotation);
      this.animationId++;
    }
    getTransformTemplate() {
      const { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = true) {
      this.root.hasTreeAnimated = true;
      if (this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i2 = 0; i2 < this.path.length; i2++) {
        const node = this.path[i2];
        node.shouldResetTransform = true;
        node.updateScroll("snapshot");
        if (node.options.layoutRoot) {
          node.willUpdate(false);
        }
      }
      const { layoutId, layout: layout2 } = this.options;
      if (layoutId === void 0 && !layout2)
        return;
      const transformTemplate = this.getTransformTemplate();
      this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    update() {
      this.updateScheduled = false;
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating) {
        this.nodes.forEach(clearIsLayoutDirty);
      }
      this.isUpdating = false;
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      const now = performance.now();
      frameData.delta = clamp(0, 1e3 / 60, now - frameData.timestamp);
      frameData.timestamp = now;
      frameData.isProcessing = true;
      steps.update.process(frameData);
      steps.preRender.process(frameData);
      steps.render.process(frameData);
      frameData.isProcessing = false;
    }
    didUpdate() {
      if (!this.updateScheduled) {
        this.updateScheduled = true;
        queueMicrotask(() => this.update());
      }
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      if (!this.projectionUpdateScheduled) {
        this.projectionUpdateScheduled = true;
        frame.preRender(this.updateProjection, false, true);
      }
    }
    scheduleCheckAfterUnmount() {
      frame.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
    }
    updateLayout() {
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i2 = 0; i2 < this.path.length; i2++) {
          const node = this.path[i2];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement } = this.options;
      visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement) {
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot: checkIsScrollRoot(this.instance),
          offset: measureScroll(this.instance)
        };
      }
    }
    resetTransform() {
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate = this.getTransformTemplate();
      const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox();
      const box = visualElement.measureViewportBox();
      const { scroll } = this.root;
      if (scroll) {
        translateAxis(box.x, scroll.offset.x);
        translateAxis(box.y, scroll.offset.y);
      }
      return box;
    }
    removeElementScroll(box) {
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      for (let i2 = 0; i2 < this.path.length; i2++) {
        const node = this.path[i2];
        const { scroll, options } = node;
        if (node !== this.root && scroll && options.layoutScroll) {
          if (scroll.isRoot) {
            copyBoxInto(boxWithoutScroll, box);
            const { scroll: rootScroll } = this.root;
            if (rootScroll) {
              translateAxis(boxWithoutScroll.x, -rootScroll.offset.x);
              translateAxis(boxWithoutScroll.y, -rootScroll.offset.y);
            }
          }
          translateAxis(boxWithoutScroll.x, scroll.offset.x);
          translateAxis(boxWithoutScroll.y, scroll.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i2 = 0; i2 < this.path.length; i2++) {
        const node = this.path[i2];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.offset.x,
            y: -node.scroll.offset.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i2 = 0; i2 < this.path.length; i2++) {
        const node = this.path[i2];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox();
        const nodeBox = node.measurePageBox();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
      this.isProjectionDirty = true;
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      if (!this.relativeParent)
        return;
      if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) {
        this.relativeParent.resolveTargetDelta(true);
      }
    }
    resolveTargetDelta(forceRecalculation = false) {
      var _a2;
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || ((_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.isProjectionDirty) || this.attemptToResolveRelativeTarget);
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      if (!this.layout || !(layout2 || layoutId))
        return;
      this.resolvedRelativeTargetAt = frameData.timestamp;
      if (!this.targetDelta && !this.relativeTarget) {
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
        this.forceRelativeParentToResolveTarget();
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      projectionFrameData.resolvedTargetDeltas++;
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
        return void 0;
      }
      if (this.parent.isProjecting()) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var _a2;
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (this.isProjectionDirty || ((_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.isProjectionDirty)) {
        canSkip = false;
      }
      if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
        canSkip = false;
      }
      if (this.resolvedRelativeTargetAt === frameData.timestamp) {
        canSkip = false;
      }
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout2 || layoutId))
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
      if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
        lead.target = lead.layout.layoutBox;
      }
      const { target } = lead;
      if (!target) {
        if (this.projectionTransform) {
          this.projectionDelta = createDelta();
          this.projectionTransform = "none";
          this.scheduleRender();
        }
        return;
      }
      if (!this.projectionDelta) {
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      const prevProjectionTransform = this.projectionTransform;
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
      if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
      projectionFrameData.recalculatedProjection++;
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll = true) {
      this.options.scheduleRender && this.options.scheduleRender();
      if (notifyAll) {
        const stack = this.getStack();
        stack && stack.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      const snapshot = this.snapshot;
      const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      }
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const snapshotSource = snapshot ? snapshot.source : void 0;
      const layoutSource = this.layout ? this.layout.source : void 0;
      const isSharedLayoutAnimation = snapshotSource !== layoutSource;
      const stack = this.getStack();
      const isOnlyMember = !stack || stack.members.length <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      let prevRelativeTarget;
      this.mixTargetDelta = (latest) => {
        const progress2 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress2);
        mixAxisDelta(targetDelta.y, delta.y, progress2);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
          if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
            this.isProjectionDirty = false;
          }
          if (!prevRelativeTarget)
            prevRelativeTarget = createBox();
          copyBoxInto(prevRelativeTarget, this.relativeTarget);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress2;
      };
      this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      this.notifyListeners("animationStart");
      this.currentAnimation && this.currentAnimation.stop();
      if (this.resumingFrom && this.resumingFrom.currentAnimation) {
        this.resumingFrom.currentAnimation.stop();
      }
      if (this.pendingAnimation) {
        cancelFrame(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = frame.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        this.currentAnimation = animateSingleValue(0, animationTarget, {
          ...options,
          onUpdate: (latest) => {
            this.mixTargetDelta(latest);
            options.onUpdate && options.onUpdate(latest);
          },
          onComplete: () => {
            options.onComplete && options.onComplete();
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      const stack = this.getStack();
      stack && stack.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      if (this.currentAnimation) {
        this.mixTargetDelta && this.mixTargetDelta(animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout: layout2, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout2)
        return;
      if (this !== lead && this.layout && layout2 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout2.layoutBox)) {
        target = this.target || createBox();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      const config = node.options.initialPromotionConfig;
      node.promote({
        transition: config ? config.transition : void 0,
        preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      var _a2;
      const { layoutId } = this.options;
      return layoutId ? ((_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.lead) || this : this;
    }
    getPrevLead() {
      var _a2;
      const { layoutId } = this.options;
      return layoutId ? (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasRotate = false;
      const { latestValues } = visualElement;
      if (latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ) {
        hasRotate = true;
      }
      if (!hasRotate)
        return;
      const resetValues = {};
      for (let i2 = 0; i2 < transformAxes.length; i2++) {
        const key = "rotate" + transformAxes[i2];
        if (latestValues[key]) {
          resetValues[key] = latestValues[key];
          visualElement.setStaticValue(key, 0);
        }
      }
      visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
      }
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp) {
      var _a2, _b;
      if (!this.instance || this.isSVG)
        return void 0;
      if (!this.isVisible) {
        return hiddenVisibility;
      }
      const styles = {
        visibility: ""
      };
      const transformTemplate = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      const { x, y } = this.projectionDelta;
      styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
      if (lead.animationValues) {
        styles.opacity = lead === this ? (_b = (_a2 = valuesToRender.opacity) !== null && _a2 !== void 0 ? _a2 : this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo } = scaleCorrectors[key];
        const corrected = styles.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i2 = 0; i2 < num; i2++) {
            styles[applyTo[i2]] = corrected;
          }
        } else {
          styles[key] = corrected;
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "" : "none";
      }
      return styles;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((node) => {
        var _a2;
        return (_a2 = node.currentAnimation) === null || _a2 === void 0 ? void 0 : _a2.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  }, __name(_a, "ProjectionNode"), _a;
}
__name(createProjectionNode, "createProjectionNode");
function updateLayout(node) {
  node.updateLayout();
}
__name(updateLayout, "updateLayout");
function notifyLayoutUpdate(node) {
  var _a;
  const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout2, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    const isShared = snapshot.source !== node.layout.source;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(axisSnapshot);
        axisSnapshot.min = layout2[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout2)) {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(layout2[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
        if (node.relativeTarget && !node.currentAnimation) {
          node.isProjectionDirty = true;
          node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
        }
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout2, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout2, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeTargetChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout2, parentLayout.layoutBox);
          if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
            hasRelativeTargetChanged = true;
          }
          if (relativeParent.options.layoutRoot) {
            node.relativeTarget = relativeLayout;
            node.relativeTargetOrigin = relativeSnapshot;
            node.relativeParent = relativeParent;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout: layout2,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged
    });
  } else if (node.isLead()) {
    const { onExitComplete } = node.options;
    onExitComplete && onExitComplete();
  }
  node.options.transition = void 0;
}
__name(notifyLayoutUpdate, "notifyLayoutUpdate");
function propagateDirtyNodes(node) {
  projectionFrameData.totalNodes++;
  if (!node.parent)
    return;
  if (!node.isProjecting()) {
    node.isProjectionDirty = node.parent.isProjectionDirty;
  }
  node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
  node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
__name(propagateDirtyNodes, "propagateDirtyNodes");
function cleanDirtyNodes(node) {
  node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
__name(cleanDirtyNodes, "cleanDirtyNodes");
function clearSnapshot(node) {
  node.clearSnapshot();
}
__name(clearSnapshot, "clearSnapshot");
function clearMeasurements(node) {
  node.clearMeasurements();
}
__name(clearMeasurements, "clearMeasurements");
function clearIsLayoutDirty(node) {
  node.isLayoutDirty = false;
}
__name(clearIsLayoutDirty, "clearIsLayoutDirty");
function resetTransformStyle(node) {
  const { visualElement } = node.options;
  if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
__name(resetTransformStyle, "resetTransformStyle");
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
  node.isProjectionDirty = true;
}
__name(finishAnimation, "finishAnimation");
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
__name(resolveTargetDelta, "resolveTargetDelta");
function calcProjection(node) {
  node.calcProjection();
}
__name(calcProjection, "calcProjection");
function resetRotation(node) {
  node.resetRotation();
}
__name(resetRotation, "resetRotation");
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
__name(removeLeadSnapshots, "removeLeadSnapshots");
function mixAxisDelta(output, delta, p2) {
  output.translate = mix(delta.translate, 0, p2);
  output.scale = mix(delta.scale, 1, p2);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
__name(mixAxisDelta, "mixAxisDelta");
function mixAxis(output, from, to, p2) {
  output.min = mix(from.min, to.min, p2);
  output.max = mix(from.max, to.max, p2);
}
__name(mixAxis, "mixAxis");
function mixBox(output, from, to, p2) {
  mixAxis(output.x, from.x, to.x, p2);
  mixAxis(output.y, from.y, to.y, p2);
}
__name(mixBox, "mixBox");
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
__name(hasOpacityCrossfade, "hasOpacityCrossfade");
const defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
const userAgentContains = /* @__PURE__ */ __name((string) => typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes(string), "userAgentContains");
const roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(axis) {
  axis.min = roundPoint(axis.min);
  axis.max = roundPoint(axis.max);
}
__name(roundAxis, "roundAxis");
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
__name(roundBox, "roundBox");
function shouldAnimatePositionOnly(animationType, snapshot, layout2) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout2), 0.2);
}
__name(shouldAnimatePositionOnly, "shouldAnimatePositionOnly");
const DocumentProjectionNode = createProjectionNode({
  attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});
const rootProjectionNode = {
  current: void 0
};
const HTMLProjectionNode = createProjectionNode({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode({});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});
const drag = {
  pan: {
    Feature: PanGesture
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};
const splitCSSVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  const match = splitCSSVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token, fallback] = match;
  return [token, fallback];
}
__name(parseCSSVariable, "parseCSSVariable");
function getVariableValue(current, element, depth = 1) {
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  } else if (isCSSVariableToken(fallback)) {
    return getVariableValue(fallback, element, depth + 1);
  } else {
    return fallback;
  }
}
__name(getVariableValue, "getVariableValue");
function resolveCSSVariables(visualElement, { ...target }, transitionEnd) {
  const element = visualElement.current;
  if (!(element instanceof Element))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = { ...transitionEnd };
  }
  visualElement.values.forEach((value) => {
    const current = value.get();
    if (!isCSSVariableToken(current))
      return;
    const resolved = getVariableValue(current, element);
    if (resolved)
      value.set(resolved);
  });
  for (const key in target) {
    const current = target[key];
    if (!isCSSVariableToken(current))
      continue;
    const resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (!transitionEnd)
      transitionEnd = {};
    if (transitionEnd[key] === void 0) {
      transitionEnd[key] = current;
    }
  }
  return { target, transitionEnd };
}
__name(resolveCSSVariables, "resolveCSSVariables");
const positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y",
  "translateX",
  "translateY"
]);
const isPositionalKey = /* @__PURE__ */ __name((key) => positionalKeys.has(key), "isPositionalKey");
const hasPositionalKey = /* @__PURE__ */ __name((target) => {
  return Object.keys(target).some(isPositionalKey);
}, "hasPositionalKey");
const isNumOrPxType = /* @__PURE__ */ __name((v2) => v2 === number || v2 === px, "isNumOrPxType");
const getPosFromMatrix = /* @__PURE__ */ __name((matrix, pos) => parseFloat(matrix.split(", ")[pos]), "getPosFromMatrix");
const getTranslateFromMatrix = /* @__PURE__ */ __name((pos2, pos3) => (_bbox, { transform }) => {
  if (transform === "none" || !transform)
    return 0;
  const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
  if (matrix3d) {
    return getPosFromMatrix(matrix3d[1], pos3);
  } else {
    const matrix = transform.match(/^matrix\((.+)\)$/);
    if (matrix) {
      return getPosFromMatrix(matrix[1], pos2);
    } else {
      return 0;
    }
  }
}, "getTranslateFromMatrix");
const transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
const nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement.render();
  return removedTransforms;
}
__name(removeNonTranslationalTransform, "removeNonTranslationalTransform");
const positionalValues = {
  // Dimensions
  width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
const convertChangedValueTypes = /* @__PURE__ */ __name((target, visualElement, changedKeys) => {
  const originBbox = visualElement.measureViewportBox();
  const element = visualElement.current;
  const elementComputedStyle = getComputedStyle(element);
  const { display } = elementComputedStyle;
  const origin = {};
  if (display === "none") {
    visualElement.setStaticValue("display", target.display || "block");
  }
  changedKeys.forEach((key) => {
    origin[key] = positionalValues[key](originBbox, elementComputedStyle);
  });
  visualElement.render();
  const targetBbox = visualElement.measureViewportBox();
  changedKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    value && value.jump(origin[key]);
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
}, "convertChangedValueTypes");
const checkAndConvertChangedValueTypes = /* @__PURE__ */ __name((visualElement, target, origin = {}, transitionEnd = {}) => {
  target = { ...target };
  transitionEnd = { ...transitionEnd };
  const targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  let removedTransformValues = [];
  let hasAttemptedToRemoveTransformValues = false;
  const changedValueTypeKeys = [];
  targetPositionalKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (!visualElement.hasValue(key))
      return;
    let from = origin[key];
    let fromType = findDimensionValueType(from);
    const to = target[key];
    let toType;
    if (isKeyframesTarget(to)) {
      const numKeyframes = to.length;
      const fromIndex = to[0] === null ? 1 : 0;
      from = to[fromIndex];
      fromType = findDimensionValueType(from);
      for (let i2 = fromIndex; i2 < numKeyframes; i2++) {
        if (to[i2] === null)
          break;
        if (!toType) {
          toType = findDimensionValueType(to[i2]);
        } else {
          invariant(findDimensionValueType(to[i2]) === toType);
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        const current = value.get();
        if (typeof current === "string") {
          value.set(parseFloat(current));
        }
        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
        if (from === 0) {
          value.set(toType.transform(from));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement);
          hasAttemptedToRemoveTransformValues = true;
        }
        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
        value.jump(to);
      }
    }
  });
  if (changedValueTypeKeys.length) {
    const scrollY = changedValueTypeKeys.indexOf("height") >= 0 ? window.pageYOffset : null;
    const convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(([key, value]) => {
        visualElement.getValue(key).set(value);
      });
    }
    visualElement.render();
    if (isBrowser && scrollY !== null) {
      window.scrollTo({ top: scrollY });
    }
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
}, "checkAndConvertChangedValueTypes");
function unitConversion(visualElement, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) : { target, transitionEnd };
}
__name(unitConversion, "unitConversion");
const parseDomVariant = /* @__PURE__ */ __name((visualElement, target, origin, transitionEnd) => {
  const resolved = resolveCSSVariables(visualElement, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement, target, origin, transitionEnd);
}, "parseDomVariant");
const prefersReducedMotion = { current: null };
const hasReducedMotionListener = { current: false };
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = /* @__PURE__ */ __name(() => prefersReducedMotion.current = motionMediaQuery.matches, "setReducedMotionPreferences");
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}
__name(initPrefersReducedMotion, "initPrefersReducedMotion");
function updateMotionValuesFromProps(element, next, prev) {
  const { willChange } = next;
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (isWillChangeMotionValue(willChange)) {
        willChange.add(key);
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
      if (isWillChangeMotionValue(willChange)) {
        willChange.remove(key);
      }
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}
__name(updateMotionValuesFromProps, "updateMotionValuesFromProps");
const visualElementStore = /* @__PURE__ */ new WeakMap();
const featureNames = Object.keys(featureDefinitions);
const numFeatures = featureNames.length;
const propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
const numVariantProps = variantProps.length;
const _VisualElement = class _VisualElement {
  constructor({ parent, props, presenceContext, reducedMotionConfig, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.scheduleRender = () => frame.render(this.render, false, true);
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {});
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
        if (isWillChangeMotionValue(willChange)) {
          willChange.add(key);
        }
      }
    }
  }
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps) {
    return {};
  }
  mount(instance) {
    this.current = instance;
    visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!hasReducedMotionListener.current) {
      initPrefersReducedMotion();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
    if (this.parent)
      this.parent.children.add(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    visualElementStore.delete(this.current);
    this.projection && this.projection.unmount();
    cancelFrame(this.notifyUpdate);
    cancelFrame(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent && this.parent.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      this.features[key].unmount();
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    const valueIsTransform = transformProps.has(key);
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame.update(this.notifyUpdate, false, true);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
    });
    const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  loadFeatures({ children, ...renderedProps }, isStrict, preloadedFeatures2, initialLayoutGroupConfig) {
    let ProjectionNodeConstructor;
    let MeasureLayout2;
    for (let i2 = 0; i2 < numFeatures; i2++) {
      const name = featureNames[i2];
      const { isEnabled, Feature: FeatureConstructor, ProjectionNode, MeasureLayout: MeasureLayoutComponent } = featureDefinitions[name];
      if (ProjectionNode)
        ProjectionNodeConstructor = ProjectionNode;
      if (isEnabled(renderedProps)) {
        if (!this.features[name] && FeatureConstructor) {
          this.features[name] = new FeatureConstructor(this);
        }
        if (MeasureLayoutComponent) {
          MeasureLayout2 = MeasureLayoutComponent;
        }
      }
    }
    if ((this.type === "html" || this.type === "svg") && !this.projection && ProjectionNodeConstructor) {
      this.projection = new ProjectionNodeConstructor(this.latestValues, this.parent && this.parent.projection);
      const { layoutId, layout: layout2, drag: drag2, dragConstraints, layoutScroll, layoutRoot } = renderedProps;
      this.projection.setOptions({
        layoutId,
        layout: layout2,
        alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */
        animationType: typeof layout2 === "string" ? layout2 : "both",
        initialPromotionConfig: initialLayoutGroupConfig,
        layoutScroll,
        layoutRoot
      });
    }
    return MeasureLayout2;
  }
  updateFeatures() {
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature.isMounted) {
        feature.update();
      } else {
        feature.mount();
        feature.isMounted = true;
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Make a target animatable by Popmotion. For instance, if we're
   * trying to animate width from 100px to 100vw we need to measure 100vw
   * in pixels to determine what we really need to animate to. This is also
   * pluggable to support Framer's custom value types like Color,
   * and CSS variables.
   */
  makeTargetAnimatable(target, canMutate = true) {
    return this.makeTargetAnimatableFromInstance(target, this.props, canMutate);
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i2 = 0; i2 < propEventHandlers.length; i2++) {
      const key = propEventHandlers[i2];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listener = props["on" + key];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  getVariantContext(startAtParent = false) {
    if (startAtParent) {
      return this.parent ? this.parent.getVariantContext() : void 0;
    }
    if (!this.isControllingVariants) {
      const context2 = this.parent ? this.parent.getVariantContext() || {} : {};
      if (this.props.initial !== void 0) {
        context2.initial = this.props.initial;
      }
      return context2;
    }
    const context = {};
    for (let i2 = 0; i2 < numVariantProps; i2++) {
      const name = variantProps[i2];
      const prop = this.props[name];
      if (isVariantLabel(prop) || prop === false) {
        context[name] = prop;
      }
    }
    return context;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    if (value !== this.values.get(key)) {
      this.removeValue(key);
      this.bindToMotionValue(key, value);
    }
    this.values.set(key, value);
    this.latestValues[key] = value.get();
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key) {
    var _a;
    return this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : (_a = this.getBaseTargetFromProps(this.props, key)) !== null && _a !== void 0 ? _a : this.readValueFromInstance(this.current, key, this.options);
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    var _a;
    const { initial } = this.props;
    const valueFromInitial = typeof initial === "string" || typeof initial === "object" ? (_a = resolveVariantFromProps(this.props, initial)) === null || _a === void 0 ? void 0 : _a[key] : void 0;
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
};
__name(_VisualElement, "VisualElement");
let VisualElement = _VisualElement;
const _DOMVisualElement = class _DOMVisualElement extends VisualElement {
  sortInstanceNodePosition(a2, b) {
    return a2.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  makeTargetAnimatableFromInstance({ transition, transitionEnd, ...target }, { transformValues }, isMounted) {
    let origin = getOrigin(target, transition || {}, this);
    if (transformValues) {
      if (transitionEnd)
        transitionEnd = transformValues(transitionEnd);
      if (target)
        target = transformValues(target);
      if (origin)
        origin = transformValues(origin);
    }
    if (isMounted) {
      checkTargetForNewValues(this, target, origin);
      const parsed = parseDomVariant(this, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return {
      transition,
      transitionEnd,
      ...target
    };
  }
};
__name(_DOMVisualElement, "DOMVisualElement");
let DOMVisualElement = _DOMVisualElement;
function getComputedStyle$1(element) {
  return window.getComputedStyle(element);
}
__name(getComputedStyle$1, "getComputedStyle$1");
const _HTMLVisualElement = class _HTMLVisualElement extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      const computedStyle = getComputedStyle$1(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, options, props) {
    buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps) {
    return scrapeMotionValuesFromProps$1(props, prevProps);
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current)
          this.current.textContent = `${latest}`;
      });
    }
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderHTML(instance, renderState, styleProp, projection);
  }
};
__name(_HTMLVisualElement, "HTMLVisualElement");
let HTMLVisualElement = _HTMLVisualElement;
const _SVGVisualElement = class _SVGVisualElement extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  scrapeMotionValuesFromProps(props, prevProps) {
    return scrapeMotionValuesFromProps(props, prevProps);
  }
  build(renderState, latestValues, options, props) {
    buildSVGAttrs(renderState, latestValues, options, this.isSVGTag, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
};
__name(_SVGVisualElement, "SVGVisualElement");
let SVGVisualElement = _SVGVisualElement;
const createDomVisualElement = /* @__PURE__ */ __name((Component, options) => {
  return isSVGComponent(Component) ? new SVGVisualElement(options, { enableHardwareAcceleration: false }) : new HTMLVisualElement(options, { enableHardwareAcceleration: true });
}, "createDomVisualElement");
const layout = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};
const preloadedFeatures = {
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layout
};
const motion = /* @__PURE__ */ createMotionProxy((Component, config) => createDomMotionConfig(Component, config, preloadedFeatures, createDomVisualElement));
function useIsMounted() {
  const isMounted = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
__name(useIsMounted, "useIsMounted");
function useForceUpdate() {
  const isMounted = useIsMounted();
  const [forcedRenderCount, setForcedRenderCount] = reactExports.useState(0);
  const forceRender = reactExports.useCallback(() => {
    isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
  const deferredForceRender = reactExports.useCallback(() => frame.postRender(forceRender), [forceRender]);
  return [deferredForceRender, forcedRenderCount];
}
__name(useForceUpdate, "useForceUpdate");
const _PopChildMeasure = class _PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (element && prevProps.isPresent && !this.props.isPresent) {
      const size = this.props.sizeRef.current;
      size.height = element.offsetHeight || 0;
      size.width = element.offsetWidth || 0;
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
};
__name(_PopChildMeasure, "PopChildMeasure");
let PopChildMeasure = _PopChildMeasure;
function PopChild({ children, isPresent }) {
  const id2 = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  });
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left } = size.current;
    if (isPresent || !ref.current || !width || !height)
      return;
    ref.current.dataset.motionPopId = id2;
    const style = document.createElement("style");
    document.head.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id2}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top}px !important;
            left: ${left}px !important;
          }
        `);
    }
    return () => {
      document.head.removeChild(style);
    };
  }, [isPresent]);
  return reactExports.createElement(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size }, reactExports.cloneElement(children, { ref }));
}
__name(PopChild, "PopChild");
const PresenceChild = /* @__PURE__ */ __name(({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id2 = reactExports.useId();
  const context = reactExports.useMemo(
    () => ({
      id: id2,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    presenceAffectsLayout ? void 0 : [isPresent]
  );
  reactExports.useMemo(() => {
    presenceChildren.forEach((_2, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  if (mode === "popLayout") {
    children = reactExports.createElement(PopChild, { isPresent }, children);
  }
  return reactExports.createElement(PresenceContext.Provider, { value: context }, children);
}, "PresenceChild");
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
__name(newChildrenMap, "newChildrenMap");
function useUnmountEffect(callback) {
  return reactExports.useEffect(() => () => callback(), []);
}
__name(useUnmountEffect, "useUnmountEffect");
const getChildKey = /* @__PURE__ */ __name((child) => child.key || "", "getChildKey");
function updateChildLookup(children, allChildren) {
  children.forEach((child) => {
    const key = getChildKey(child);
    allChildren.set(key, child);
  });
}
__name(updateChildLookup, "updateChildLookup");
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
__name(onlyElements, "onlyElements");
const AnimatePresence = /* @__PURE__ */ __name(({ children, custom, initial = true, onExitComplete, exitBeforeEnter, presenceAffectsLayout = true, mode = "sync" }) => {
  const forceRender = reactExports.useContext(LayoutGroupContext).forceRender || useForceUpdate()[0];
  const isMounted = useIsMounted();
  const filteredChildren = onlyElements(children);
  let childrenToRender = filteredChildren;
  const exitingChildren = reactExports.useRef(/* @__PURE__ */ new Map()).current;
  const presentChildren = reactExports.useRef(childrenToRender);
  const allChildren = reactExports.useRef(/* @__PURE__ */ new Map()).current;
  const isInitialRender = reactExports.useRef(true);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    updateChildLookup(filteredChildren, allChildren);
    presentChildren.current = childrenToRender;
  });
  useUnmountEffect(() => {
    isInitialRender.current = true;
    allChildren.clear();
    exitingChildren.clear();
  });
  if (isInitialRender.current) {
    return reactExports.createElement(reactExports.Fragment, null, childrenToRender.map((child) => reactExports.createElement(PresenceChild, { key: getChildKey(child), isPresent: true, initial: initial ? void 0 : false, presenceAffectsLayout, mode }, child)));
  }
  childrenToRender = [...childrenToRender];
  const presentKeys = presentChildren.current.map(getChildKey);
  const targetKeys = filteredChildren.map(getChildKey);
  const numPresent = presentKeys.length;
  for (let i2 = 0; i2 < numPresent; i2++) {
    const key = presentKeys[i2];
    if (targetKeys.indexOf(key) === -1 && !exitingChildren.has(key)) {
      exitingChildren.set(key, void 0);
    }
  }
  if (mode === "wait" && exitingChildren.size) {
    childrenToRender = [];
  }
  exitingChildren.forEach((component, key) => {
    if (targetKeys.indexOf(key) !== -1)
      return;
    const child = allChildren.get(key);
    if (!child)
      return;
    const insertionIndex = presentKeys.indexOf(key);
    let exitingComponent = component;
    if (!exitingComponent) {
      const onExit = /* @__PURE__ */ __name(() => {
        exitingChildren.delete(key);
        const leftOverKeys = Array.from(allChildren.keys()).filter((childKey) => !targetKeys.includes(childKey));
        leftOverKeys.forEach((leftOverKey) => allChildren.delete(leftOverKey));
        presentChildren.current = filteredChildren.filter((presentChild) => {
          const presentChildKey = getChildKey(presentChild);
          return (
            // filter out the node exiting
            presentChildKey === key || // filter out the leftover children
            leftOverKeys.includes(presentChildKey)
          );
        });
        if (!exitingChildren.size) {
          if (isMounted.current === false)
            return;
          forceRender();
          onExitComplete && onExitComplete();
        }
      }, "onExit");
      exitingComponent = reactExports.createElement(PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom, presenceAffectsLayout, mode }, child);
      exitingChildren.set(key, exitingComponent);
    }
    childrenToRender.splice(insertionIndex, 0, exitingComponent);
  });
  childrenToRender = childrenToRender.map((child) => {
    const key = child.key;
    return exitingChildren.has(key) ? child : reactExports.createElement(PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout, mode }, child);
  });
  return reactExports.createElement(reactExports.Fragment, null, exitingChildren.size ? childrenToRender : childrenToRender.map((child) => reactExports.cloneElement(child)));
}, "AnimatePresence");
let e = { data: "" }, t = /* @__PURE__ */ __name((t2) => {
  if ("object" == typeof window) {
    let e2 = (t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign(document.createElement("style"), { innerHTML: " ", id: "_goober" });
    return e2.nonce = window.__nonce__, e2.parentNode || (t2 || document.head).appendChild(e2), e2.firstChild;
  }
  return t2 || e;
}, "t"), l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, a = /\/\*[^]*?\*\/|  +/g, n$1 = /\n+/g, o = /* @__PURE__ */ __name((e2, t2) => {
  let r = "", l2 = "", a2 = "";
  for (let n2 in e2) {
    let c2 = e2[n2];
    "@" == n2[0] ? "i" == n2[1] ? r = n2 + " " + c2 + ";" : l2 += "f" == n2[1] ? o(c2, n2) : n2 + "{" + o(c2, "k" == n2[1] ? "" : t2) + "}" : "object" == typeof c2 ? l2 += o(c2, t2 ? t2.replace(/([^,])+/g, (e3) => n2.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : null != c2 && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o.p ? o.p(n2, c2) : n2 + ":" + c2 + ";");
  }
  return r + (t2 && a2 ? t2 + "{" + a2 + "}" : a2) + l2;
}, "o"), c = {}, s = /* @__PURE__ */ __name((e2) => {
  if ("object" == typeof e2) {
    let t2 = "";
    for (let r in e2)
      t2 += r + s(e2[r]);
    return t2;
  }
  return e2;
}, "s"), i = /* @__PURE__ */ __name((e2, t2, r, i2, p2) => {
  let u2 = s(e2), d2 = c[u2] || (c[u2] = ((e3) => {
    let t3 = 0, r2 = 11;
    for (; t3 < e3.length; )
      r2 = 101 * r2 + e3.charCodeAt(t3++) >>> 0;
    return "go" + r2;
  })(u2));
  if (!c[d2]) {
    let t3 = u2 !== e2 ? e2 : ((e3) => {
      let t4, r2, o2 = [{}];
      for (; t4 = l.exec(e3.replace(a, "")); )
        t4[4] ? o2.shift() : t4[3] ? (r2 = t4[3].replace(n$1, " ").trim(), o2.unshift(o2[0][r2] = o2[0][r2] || {})) : o2[0][t4[1]] = t4[2].replace(n$1, " ").trim();
      return o2[0];
    })(e2);
    c[d2] = o(p2 ? { ["@keyframes " + d2]: t3 } : t3, r ? "" : "." + d2);
  }
  let f2 = r && c.g ? c.g : null;
  return r && (c.g = c[d2]), ((e3, t3, r2, l2) => {
    l2 ? t3.data = t3.data.replace(l2, e3) : -1 === t3.data.indexOf(e3) && (t3.data = r2 ? e3 + t3.data : t3.data + e3);
  })(c[d2], t2, i2, f2), d2;
}, "i"), p = /* @__PURE__ */ __name((e2, t2, r) => e2.reduce((e3, l2, a2) => {
  let n2 = t2[a2];
  if (n2 && n2.call) {
    let e4 = n2(r), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
    n2 = t3 ? "." + t3 : e4 && "object" == typeof e4 ? e4.props ? "" : o(e4, "") : false === e4 ? "" : e4;
  }
  return e3 + l2 + (null == n2 ? "" : n2);
}, ""), "p");
function u(e2) {
  let r = this || {}, l2 = e2.call ? e2(r.p) : e2;
  return i(l2.unshift ? l2.raw ? p(l2, [].slice.call(arguments, 1), r.p) : l2.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r.p) : t2), {}) : l2, t(r.target), r.g, r.o, r.k);
}
__name(u, "u");
let d, f$1, g;
u.bind({ g: 1 });
let h$1 = u.bind({ k: 1 });
function m(e2, t2, r, l2) {
  o.p = t2, d = e2, f$1 = r, g = l2;
}
__name(m, "m");
function w$1(e2, t2) {
  let r = this || {};
  return function() {
    let l2 = arguments;
    function a2(n2, o2) {
      let c2 = Object.assign({}, n2), s2 = c2.className || a2.className;
      r.p = Object.assign({ theme: f$1 && f$1() }, c2), r.o = / *go\d+/.test(s2), c2.className = u.apply(r, l2) + (s2 ? " " + s2 : ""), t2 && (c2.ref = o2);
      let i2 = e2;
      return e2[0] && (i2 = c2.as || e2, delete c2.as), g && i2[0] && g(c2), d(i2, c2);
    }
    __name(a2, "a");
    return t2 ? t2(a2) : a2;
  };
}
__name(w$1, "w$1");
var Z = /* @__PURE__ */ __name((e2) => typeof e2 == "function", "Z"), h = /* @__PURE__ */ __name((e2, t2) => Z(e2) ? e2(t2) : e2, "h");
var W = (() => {
  let e2 = 0;
  return () => (++e2).toString();
})(), E = (() => {
  let e2;
  return () => {
    if (e2 === void 0 && typeof window < "u") {
      let t2 = matchMedia("(prefers-reduced-motion: reduce)");
      e2 = !t2 || t2.matches;
    }
    return e2;
  };
})();
var re = 20, k = "default";
var H = /* @__PURE__ */ __name((e2, t2) => {
  let { toastLimit: o2 } = e2.settings;
  switch (t2.type) {
    case 0:
      return { ...e2, toasts: [t2.toast, ...e2.toasts].slice(0, o2) };
    case 1:
      return { ...e2, toasts: e2.toasts.map((r) => r.id === t2.toast.id ? { ...r, ...t2.toast } : r) };
    case 2:
      let { toast: s2 } = t2;
      return H(e2, { type: e2.toasts.find((r) => r.id === s2.id) ? 1 : 0, toast: s2 });
    case 3:
      let { toastId: a2 } = t2;
      return { ...e2, toasts: e2.toasts.map((r) => r.id === a2 || a2 === void 0 ? { ...r, dismissed: true, visible: false } : r) };
    case 4:
      return t2.toastId === void 0 ? { ...e2, toasts: [] } : { ...e2, toasts: e2.toasts.filter((r) => r.id !== t2.toastId) };
    case 5:
      return { ...e2, pausedAt: t2.time };
    case 6:
      let i2 = t2.time - (e2.pausedAt || 0);
      return { ...e2, pausedAt: void 0, toasts: e2.toasts.map((r) => ({ ...r, pauseDuration: r.pauseDuration + i2 })) };
  }
}, "H"), v = [], j = { toasts: [], pausedAt: void 0, settings: { toastLimit: re } }, f = {}, Y = /* @__PURE__ */ __name((e2, t2 = k) => {
  f[t2] = H(f[t2] || j, e2), v.forEach(([o2, s2]) => {
    o2 === t2 && s2(f[t2]);
  });
}, "Y"), _ = /* @__PURE__ */ __name((e2) => Object.keys(f).forEach((t2) => Y(e2, t2)), "_"), Q = /* @__PURE__ */ __name((e2) => Object.keys(f).find((t2) => f[t2].toasts.some((o2) => o2.id === e2)), "Q"), S = /* @__PURE__ */ __name((e2 = k) => (t2) => {
  Y(t2, e2);
}, "S"), se = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 }, V = /* @__PURE__ */ __name((e2 = {}, t2 = k) => {
  let [o2, s2] = reactExports.useState(f[t2] || j), a2 = reactExports.useRef(f[t2]);
  reactExports.useEffect(() => (a2.current !== f[t2] && s2(f[t2]), v.push([t2, s2]), () => {
    let r = v.findIndex(([l2]) => l2 === t2);
    r > -1 && v.splice(r, 1);
  }), [t2]);
  let i2 = o2.toasts.map((r) => {
    var l2, g2, T;
    return { ...e2, ...e2[r.type], ...r, removeDelay: r.removeDelay || ((l2 = e2[r.type]) == null ? void 0 : l2.removeDelay) || (e2 == null ? void 0 : e2.removeDelay), duration: r.duration || ((g2 = e2[r.type]) == null ? void 0 : g2.duration) || (e2 == null ? void 0 : e2.duration) || se[r.type], style: { ...e2.style, ...(T = e2[r.type]) == null ? void 0 : T.style, ...r.style } };
  });
  return { ...o2, toasts: i2 };
}, "V");
var ie = /* @__PURE__ */ __name((e2, t2 = "blank", o2) => ({ createdAt: Date.now(), visible: true, dismissed: false, type: t2, ariaProps: { role: "status", "aria-live": "polite" }, message: e2, pauseDuration: 0, ...o2, id: (o2 == null ? void 0 : o2.id) || W() }), "ie"), P = /* @__PURE__ */ __name((e2) => (t2, o2) => {
  let s2 = ie(t2, e2, o2);
  return S(s2.toasterId || Q(s2.id))({ type: 2, toast: s2 }), s2.id;
}, "P"), n = /* @__PURE__ */ __name((e2, t2) => P("blank")(e2, t2), "n");
n.error = P("error");
n.success = P("success");
n.loading = P("loading");
n.custom = P("custom");
n.dismiss = (e2, t2) => {
  let o2 = { type: 3, toastId: e2 };
  t2 ? S(t2)(o2) : _(o2);
};
n.dismissAll = (e2) => n.dismiss(void 0, e2);
n.remove = (e2, t2) => {
  let o2 = { type: 4, toastId: e2 };
  t2 ? S(t2)(o2) : _(o2);
};
n.removeAll = (e2) => n.remove(void 0, e2);
n.promise = (e2, t2, o2) => {
  let s2 = n.loading(t2.loading, { ...o2, ...o2 == null ? void 0 : o2.loading });
  return typeof e2 == "function" && (e2 = e2()), e2.then((a2) => {
    let i2 = t2.success ? h(t2.success, a2) : void 0;
    return i2 ? n.success(i2, { id: s2, ...o2, ...o2 == null ? void 0 : o2.success }) : n.dismiss(s2), a2;
  }).catch((a2) => {
    let i2 = t2.error ? h(t2.error, a2) : void 0;
    i2 ? n.error(i2, { id: s2, ...o2, ...o2 == null ? void 0 : o2.error }) : n.dismiss(s2);
  }), e2;
};
var ce = 1e3, w = /* @__PURE__ */ __name((e2, t2 = "default") => {
  let { toasts: o2, pausedAt: s2 } = V(e2, t2), a2 = reactExports.useRef(/* @__PURE__ */ new Map()).current, i2 = reactExports.useCallback((c2, m2 = ce) => {
    if (a2.has(c2))
      return;
    let p2 = setTimeout(() => {
      a2.delete(c2), r({ type: 4, toastId: c2 });
    }, m2);
    a2.set(c2, p2);
  }, []);
  reactExports.useEffect(() => {
    if (s2)
      return;
    let c2 = Date.now(), m2 = o2.map((p2) => {
      if (p2.duration === 1 / 0)
        return;
      let R = (p2.duration || 0) + p2.pauseDuration - (c2 - p2.createdAt);
      if (R < 0) {
        p2.visible && n.dismiss(p2.id);
        return;
      }
      return setTimeout(() => n.dismiss(p2.id, t2), R);
    });
    return () => {
      m2.forEach((p2) => p2 && clearTimeout(p2));
    };
  }, [o2, s2, t2]);
  let r = reactExports.useCallback(S(t2), [t2]), l2 = reactExports.useCallback(() => {
    r({ type: 5, time: Date.now() });
  }, [r]), g2 = reactExports.useCallback((c2, m2) => {
    r({ type: 1, toast: { id: c2, height: m2 } });
  }, [r]), T = reactExports.useCallback(() => {
    s2 && r({ type: 6, time: Date.now() });
  }, [s2, r]), d2 = reactExports.useCallback((c2, m2) => {
    let { reverseOrder: p2 = false, gutter: R = 8, defaultPosition: z } = m2 || {}, O = o2.filter((u2) => (u2.position || z) === (c2.position || z) && u2.height), K = O.findIndex((u2) => u2.id === c2.id), B = O.filter((u2, I) => I < K && u2.visible).length;
    return O.filter((u2) => u2.visible).slice(...p2 ? [B + 1] : [0, B]).reduce((u2, I) => u2 + (I.height || 0) + R, 0);
  }, [o2]);
  return reactExports.useEffect(() => {
    o2.forEach((c2) => {
      if (c2.dismissed)
        i2(c2.id, c2.removeDelay);
      else {
        let m2 = a2.get(c2.id);
        m2 && (clearTimeout(m2), a2.delete(c2.id));
      }
    });
  }, [o2, i2]), { toasts: o2, handlers: { updateHeight: g2, startPause: l2, endPause: T, calculateOffset: d2 } };
}, "w");
var de = h$1`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, me = h$1`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, le = h$1`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, C = w$1("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e2) => e2.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${de} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${me} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e2) => e2.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${le} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;
var Te = h$1`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, F = w$1("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e2) => e2.secondary || "#e0e0e0"};
  border-right-color: ${(e2) => e2.primary || "#616161"};
  animation: ${Te} 1s linear infinite;
`;
var ge = h$1`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, he = h$1`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, L = w$1("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e2) => e2.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ge} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${he} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e2) => e2.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;
var be = w$1("div")`
  position: absolute;
`, Se = w$1("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, Ae = h$1`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, Pe = w$1("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ae} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, $ = /* @__PURE__ */ __name(({ toast: e2 }) => {
  let { icon: t2, type: o2, iconTheme: s2 } = e2;
  return t2 !== void 0 ? typeof t2 == "string" ? reactExports.createElement(Pe, null, t2) : t2 : o2 === "blank" ? null : reactExports.createElement(Se, null, reactExports.createElement(F, { ...s2 }), o2 !== "loading" && reactExports.createElement(be, null, o2 === "error" ? reactExports.createElement(C, { ...s2 }) : reactExports.createElement(L, { ...s2 })));
}, "$");
var Re = /* @__PURE__ */ __name((e2) => `
0% {transform: translate3d(0,${e2 * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, "Re"), Ee = /* @__PURE__ */ __name((e2) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e2 * -150}%,-1px) scale(.6); opacity:0;}
`, "Ee"), ve = "0%{opacity:0;} 100%{opacity:1;}", De = "0%{opacity:1;} 100%{opacity:0;}", Oe = w$1("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, Ie = w$1("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, ke = /* @__PURE__ */ __name((e2, t2) => {
  let s2 = e2.includes("top") ? 1 : -1, [a2, i2] = E() ? [ve, De] : [Re(s2), Ee(s2)];
  return { animation: t2 ? `${h$1(a2)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${h$1(i2)} 0.4s forwards cubic-bezier(.06,.71,.55,1)` };
}, "ke"), N = reactExports.memo(({ toast: e2, position: t2, style: o2, children: s2 }) => {
  let a2 = e2.height ? ke(e2.position || t2 || "top-center", e2.visible) : { opacity: 0 }, i2 = reactExports.createElement($, { toast: e2 }), r = reactExports.createElement(Ie, { ...e2.ariaProps }, h(e2.message, e2));
  return reactExports.createElement(Oe, { className: e2.className, style: { ...a2, ...o2, ...e2.style } }, typeof s2 == "function" ? s2({ icon: i2, message: r }) : reactExports.createElement(reactExports.Fragment, null, i2, r));
});
m(reactExports.createElement);
var we = /* @__PURE__ */ __name(({ id: e2, className: t2, style: o2, onHeightUpdate: s2, children: a2 }) => {
  let i2 = reactExports.useCallback((r) => {
    if (r) {
      let l2 = /* @__PURE__ */ __name(() => {
        let g2 = r.getBoundingClientRect().height;
        s2(e2, g2);
      }, "l");
      l2(), new MutationObserver(l2).observe(r, { subtree: true, childList: true, characterData: true });
    }
  }, [e2, s2]);
  return reactExports.createElement("div", { ref: i2, className: t2, style: o2 }, a2);
}, "we"), Me = /* @__PURE__ */ __name((e2, t2) => {
  let o2 = e2.includes("top"), s2 = o2 ? { top: 0 } : { bottom: 0 }, a2 = e2.includes("center") ? { justifyContent: "center" } : e2.includes("right") ? { justifyContent: "flex-end" } : {};
  return { left: 0, right: 0, display: "flex", position: "absolute", transition: E() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)", transform: `translateY(${t2 * (o2 ? 1 : -1)}px)`, ...s2, ...a2 };
}, "Me"), Ce = u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`, D = 16, Fe = /* @__PURE__ */ __name(({ reverseOrder: e2, position: t2 = "top-center", toastOptions: o2, gutter: s2, children: a2, toasterId: i2, containerStyle: r, containerClassName: l2 }) => {
  let { toasts: g2, handlers: T } = w(o2, i2);
  return reactExports.createElement("div", { "data-rht-toaster": i2 || "", style: { position: "fixed", zIndex: 9999, top: D, left: D, right: D, bottom: D, pointerEvents: "none", ...r }, className: l2, onMouseEnter: T.startPause, onMouseLeave: T.endPause }, g2.map((d2) => {
    let c2 = d2.position || t2, m2 = T.calculateOffset(d2, { reverseOrder: e2, gutter: s2, defaultPosition: t2 }), p2 = Me(c2, m2);
    return reactExports.createElement(we, { id: d2.id, key: d2.id, onHeightUpdate: T.updateHeight, className: d2.visible ? Ce : "", style: p2 }, d2.type === "custom" ? h(d2.message, d2) : a2 ? a2(d2) : reactExports.createElement(N, { toast: d2, position: c2 }));
  }));
}, "Fe");
var zt = n;
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const toKebabCase = /* @__PURE__ */ __name((string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), "toKebabCase");
const createLucideIcon = /* @__PURE__ */ __name((iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ color: color2 = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }, ref) => reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color2,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]) || []
      ]
    )
  );
  Component.displayName = `${iconName}`;
  return Component;
}, "createLucideIcon");
var createLucideIcon$1 = createLucideIcon;
const Award = createLucideIcon$1("Award", [
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }],
  ["path", { d: "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11", key: "em7aur" }]
]);
const Bell = createLucideIcon$1("Bell", [
  ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", key: "1qo2s2" }],
  ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }]
]);
const Bot = createLucideIcon$1("Bot", [
  [
    "rect",
    { width: "18", height: "10", x: "3", y: "11", rx: "2", key: "1ofdy3" }
  ],
  ["circle", { cx: "12", cy: "5", r: "2", key: "f1ur92" }],
  ["path", { d: "M12 7v4", key: "xawao1" }],
  ["line", { x1: "8", x2: "8", y1: "16", y2: "16", key: "h6x27f" }],
  ["line", { x1: "16", x2: "16", y1: "16", y2: "16", key: "5lty7f" }]
]);
const Check = createLucideIcon$1("Check", [
  ["polyline", { points: "20 6 9 17 4 12", key: "10jjfj" }]
]);
const ChevronRight = createLucideIcon$1("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
const Clock = createLucideIcon$1("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
const EyeOff = createLucideIcon$1("EyeOff", [
  ["path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24", key: "1jxqfv" }],
  [
    "path",
    {
      d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",
      key: "9wicm4"
    }
  ],
  [
    "path",
    {
      d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",
      key: "1jreej"
    }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
]);
const Eye = createLucideIcon$1("Eye", [
  [
    "path",
    { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
const Flower = createLucideIcon$1("Flower", [
  [
    "path",
    {
      d: "M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15",
      key: "51z86h"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "m8 16 1.5-1.5", key: "ce6zph" }],
  ["path", { d: "M14.5 9.5 16 8", key: "1kzrzb" }],
  ["path", { d: "m8 8 1.5 1.5", key: "1yv88w" }],
  ["path", { d: "M14.5 14.5 16 16", key: "12xhjh" }]
]);
const Focus = createLucideIcon$1("Focus", [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
]);
const Heart = createLucideIcon$1("Heart", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
]);
const Home = createLucideIcon$1("Home", [
  [
    "path",
    { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "y5dka4" }
  ],
  ["polyline", { points: "9 22 9 12 15 12 15 22", key: "e2us08" }]
]);
const Info = createLucideIcon$1("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
const Leaf = createLucideIcon$1("Leaf", [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  [
    "path",
    { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }
  ]
]);
const Loader = createLucideIcon$1("Loader", [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "6", key: "gza1u7" }],
  ["line", { x1: "12", x2: "12", y1: "18", y2: "22", key: "1qhbu9" }],
  ["line", { x1: "4.93", x2: "7.76", y1: "4.93", y2: "7.76", key: "xae44r" }],
  [
    "line",
    { x1: "16.24", x2: "19.07", y1: "16.24", y2: "19.07", key: "bxnmvf" }
  ],
  ["line", { x1: "2", x2: "6", y1: "12", y2: "12", key: "89khin" }],
  ["line", { x1: "18", x2: "22", y1: "12", y2: "12", key: "pb8tfm" }],
  ["line", { x1: "4.93", x2: "7.76", y1: "19.07", y2: "16.24", key: "1uxjnu" }],
  ["line", { x1: "16.24", x2: "19.07", y1: "7.76", y2: "4.93", key: "6duxfx" }]
]);
const Lock = createLucideIcon$1("Lock", [
  [
    "rect",
    {
      width: "18",
      height: "11",
      x: "3",
      y: "11",
      rx: "2",
      ry: "2",
      key: "1w4ew1"
    }
  ],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);
const LogOut = createLucideIcon$1("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);
const Mail = createLucideIcon$1("Mail", [
  [
    "rect",
    { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }
  ],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
const MessageCircle = createLucideIcon$1("MessageCircle", [
  ["path", { d: "m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z", key: "v2veuj" }]
]);
const Minus = createLucideIcon$1("Minus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }]
]);
const Moon = createLucideIcon$1("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
const Palette = createLucideIcon$1("Palette", [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", key: "1xcu5" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", key: "736e4u" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", key: "clrty" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", key: "1s4xz9" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
]);
const Pause = createLucideIcon$1("Pause", [
  ["rect", { width: "4", height: "16", x: "6", y: "4", key: "iffhe4" }],
  ["rect", { width: "4", height: "16", x: "14", y: "4", key: "sjin7j" }]
]);
const PenLine = createLucideIcon$1("PenLine", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    { d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z", key: "ymcmye" }
  ]
]);
const Phone = createLucideIcon$1("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
]);
const Play = createLucideIcon$1("Play", [
  ["polygon", { points: "5 3 19 12 5 21 5 3", key: "191637" }]
]);
const Plus = createLucideIcon$1("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
const Quote = createLucideIcon$1("Quote", [
  [
    "path",
    {
      d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",
      key: "4rm80e"
    }
  ],
  [
    "path",
    {
      d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
      key: "10za9r"
    }
  ]
]);
const RotateCcw = createLucideIcon$1("RotateCcw", [
  [
    "path",
    { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }
  ],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
const Send = createLucideIcon$1("Send", [
  ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
  ["path", { d: "M22 2 11 13", key: "nzbqef" }]
]);
const Settings$1 = createLucideIcon$1("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
const Shield = createLucideIcon$1("Shield", [
  ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", key: "3xmgem" }]
]);
const Smile = createLucideIcon$1("Smile", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
]);
const Sparkles = createLucideIcon$1("Sparkles", [
  [
    "path",
    {
      d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
      key: "17u4zn"
    }
  ],
  ["path", { d: "M5 3v4", key: "bklmnn" }],
  ["path", { d: "M19 17v4", key: "iiml17" }],
  ["path", { d: "M3 5h4", key: "nem4j1" }],
  ["path", { d: "M17 19h4", key: "lbex7p" }]
]);
const Sun = createLucideIcon$1("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);
const TreePine = createLucideIcon$1("TreePine", [
  [
    "path",
    {
      d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
      key: "cpyugq"
    }
  ],
  ["path", { d: "M12 22v-3", key: "kmzjlo" }]
]);
const User = createLucideIcon$1("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
const Users = createLucideIcon$1("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
const X = createLucideIcon$1("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const Zap = createLucideIcon$1("Zap", [
  [
    "polygon",
    { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2", key: "45s27k" }
  ]
]);
const SplashScreen = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 bg-gradient-to-br from-mint-100 via-sky-100 to-lavender-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "floating-particles", children: [...Array(8)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "particle",
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        },
        animate: {
          y: [-20, -60, -20],
          opacity: [0.3, 0.8, 0.3]
        },
        transition: {
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }
      },
      i2
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scale: 0.5, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 1, ease: "easeOut" },
          className: "mb-8",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                },
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                className: "w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-mint-400 to-sky-400 rounded-full flex items-center justify-center shadow-2xl",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-12 h-12 text-white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                },
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                className: "absolute -top-2 -right-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-lavender-400" })
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { y: 20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 1, delay: 0.5 },
          className: "text-4xl font-bold gradient-text mb-4",
          children: "MindEase"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { y: 20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 1, delay: 0.7 },
          className: "text-lg text-gray-600 dark:text-gray-300 mb-8",
          children: "Your companion for mental wellness"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scale: 0 },
          animate: { scale: 1 },
          transition: { duration: 0.5, delay: 1.5 },
          className: "flex justify-center space-x-2",
          children: [...Array(3)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: {
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              },
              transition: {
                duration: 1,
                repeat: Infinity,
                delay: i2 * 0.2
              },
              className: "w-3 h-3 bg-mint-400 rounded-full"
            },
            i2
          ))
        }
      )
    ] })
  ] });
}, "SplashScreen");
const apiCall = /* @__PURE__ */ __name(async (endpoint, data = {}) => {
  try {
    const response = await fetch(`https://builder.empromptu.ai${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer b4180b77229c9c379b8e198ab5ff4a37",
        "X-Generated-App-ID": "79bfc72e-90c7-4097-9d0b-dbefe1997145",
        "X-Usage-Key": "e67b912b699055762b672916cd2e88ec"
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}, "apiCall");
const createAgent = /* @__PURE__ */ __name(async (instructions, agentName) => {
  return await apiCall("/api_tools/create-agent", {
    instructions,
    agent_name: agentName
  });
}, "createAgent");
const chatWithAgent = /* @__PURE__ */ __name(async (agentId, message) => {
  return await apiCall("/api_tools/chat", {
    agent_id: agentId,
    message
  });
}, "chatWithAgent");
const AuthContext = reactExports.createContext();
const useAuth = /* @__PURE__ */ __name(() => {
  const context = reactExports.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}, "useAuth");
const AuthProvider = /* @__PURE__ */ __name(({ children }) => {
  const [user, setUser] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    initializeAuth();
  }, []);
  const initializeAuth = /* @__PURE__ */ __name(async () => {
    try {
      const savedUser = localStorage.getItem("mindeease_user");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
    } finally {
      setIsLoading(false);
    }
  }, "initializeAuth");
  const login = /* @__PURE__ */ __name(async (email, password) => {
    try {
      const query = `
        SELECT id, username, email, profile_data, calm_level, total_points 
        FROM newschema_79bfc72e90c740979d0bdbefe1997145.users 
        WHERE email = $1 AND password_hash = $2
      `;
      const response = await apiCall("/api_tools/templates/call_postgres", {
        query,
        params: [email, password]
        // In production, use proper password hashing
      });
      if (response.data && response.data.length > 0) {
        const userData = response.data[0];
        setUser(userData);
        localStorage.setItem("mindeease_user", JSON.stringify(userData));
        return { success: true, user: userData };
      } else {
        return { success: false, error: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Login failed" };
    }
  }, "login");
  const signup = /* @__PURE__ */ __name(async (username, email, password) => {
    try {
      const query = `
        INSERT INTO newschema_79bfc72e90c740979d0bdbefe1997145.users 
        (username, email, password_hash, profile_data, calm_level, total_points)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, username, email, profile_data, calm_level, total_points
      `;
      const profileData = JSON.stringify({
        joinDate: (/* @__PURE__ */ new Date()).toISOString(),
        avatar: null,
        bio: "",
        moodQuote: "Starting my mindfulness journey 🌱"
      });
      const response = await apiCall("/api_tools/templates/call_postgres", {
        query,
        params: [username, email, password, profileData, 1, 0]
      });
      if (response.data && response.data.length > 0) {
        const userData = response.data[0];
        setUser(userData);
        localStorage.setItem("mindeease_user", JSON.stringify(userData));
        return { success: true, user: userData };
      } else {
        return { success: false, error: "Signup failed" };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: "Signup failed" };
    }
  }, "signup");
  const loginAsGuest = /* @__PURE__ */ __name(() => {
    const guestUser = {
      id: "guest",
      username: "Guest User",
      email: "guest@mindeease.com",
      profile_data: JSON.stringify({
        joinDate: (/* @__PURE__ */ new Date()).toISOString(),
        avatar: null,
        bio: "Exploring MindEase as a guest",
        moodQuote: "Taking it one breath at a time 🌸"
      }),
      calm_level: 1,
      total_points: 0,
      isGuest: true
    };
    setUser(guestUser);
    localStorage.setItem("mindeease_user", JSON.stringify(guestUser));
    return { success: true, user: guestUser };
  }, "loginAsGuest");
  const logout = /* @__PURE__ */ __name(() => {
    setUser(null);
    localStorage.removeItem("mindeease_user");
  }, "logout");
  const value = {
    user,
    isLoading,
    login,
    signup,
    loginAsGuest,
    logout
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
}, "AuthProvider");
const LoginScreen = /* @__PURE__ */ __name(() => {
  const { login, signup, loginAsGuest } = useAuth();
  const [isSignup, setIsSignup] = reactExports.useState(false);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    username: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const handleSubmit = /* @__PURE__ */ __name(async (e2) => {
    e2.preventDefault();
    setIsLoading(true);
    try {
      let result;
      if (isSignup) {
        result = await signup(formData.username, formData.email, formData.password);
      } else {
        result = await login(formData.email, formData.password);
      }
      if (result.success) {
        zt.success(`Welcome ${isSignup ? "to" : "back to"} MindEase! 🌱`);
      } else {
        zt.error(result.error || "Authentication failed");
      }
    } catch (error) {
      zt.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, "handleSubmit");
  const handleGuestLogin = /* @__PURE__ */ __name(() => {
    const result = loginAsGuest();
    if (result.success) {
      zt.success("Welcome to MindEase! 🌸");
    }
  }, "handleGuestLogin");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", children: [...Array(6)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute rounded-full opacity-20",
        style: {
          width: `${100 + Math.random() * 200}px`,
          height: `${100 + Math.random() * 200}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `linear-gradient(45deg, ${["#a7f3d0", "#bae6fd", "#e9d5ff", "#faf2e1"][Math.floor(Math.random() * 4)]}, transparent)`
        },
        animate: {
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        },
        transition: {
          duration: 8 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      i2
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        className: "glass-card p-8 w-full max-w-md relative z-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { rotate: [0, 5, -5, 0] },
                transition: { duration: 4, repeat: Infinity },
                className: "w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-mint-400 to-sky-400 rounded-full flex items-center justify-center",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-8 h-8 text-white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold gradient-text mb-2", children: "MindEase" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: isSignup ? "Begin your wellness journey" : "Welcome back to calm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
            isSignup && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "relative",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "Your name",
                      value: formData.username,
                      onChange: (e2) => setFormData({ ...formData, username: e2.target.value }),
                      className: "w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint-400 transition-all",
                      required: true
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  placeholder: "Email address",
                  value: formData.email,
                  onChange: (e2) => setFormData({ ...formData, email: e2.target.value }),
                  className: "w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint-400 transition-all",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: showPassword ? "text" : "password",
                  placeholder: "Password",
                  value: formData.password,
                  onChange: (e2) => setFormData({ ...formData, password: e2.target.value }),
                  className: "w-full pl-12 pr-12 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint-400 transition-all",
                  required: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors",
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                type: "submit",
                disabled: isLoading,
                className: "w-full py-3 bg-gradient-to-r from-mint-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50",
                children: isLoading ? "Please wait..." : isSignup ? "Create Account" : "Sign In"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setIsSignup(!isSignup),
                className: "text-mint-600 dark:text-mint-400 hover:underline transition-colors",
                children: isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"
              }
            ) }),
            !isSignup && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors", children: "Forgot password?" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-gray-300 dark:border-gray-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 bg-white/70 dark:bg-gray-800/70 text-gray-500", children: "or" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                onClick: handleGuestLogin,
                className: "w-full py-3 bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all",
                children: "Continue as Guest"
              }
            )
          ] })
        ]
      }
    )
  ] });
}, "LoginScreen");
const OnboardingFlow = /* @__PURE__ */ __name(({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = reactExports.useState(0);
  const slides = [
    {
      icon: Heart,
      title: "Manage Stress & Anxiety",
      description: "Find peace through guided meditations, breathing exercises, and mindfulness practices tailored to your needs.",
      color: "from-mint-400 to-mint-600"
    },
    {
      icon: Moon,
      title: "Sleep Peacefully",
      description: "Drift into restful sleep with soothing sounds, bedtime stories, and relaxation techniques.",
      color: "from-sky-400 to-sky-600"
    },
    {
      icon: MessageCircle,
      title: "AI Support Companion",
      description: "Chat freely with MindBot, your caring AI companion available 24/7 for emotional support and guidance.",
      color: "from-lavender-400 to-lavender-600"
    },
    {
      icon: TreePine,
      title: "Grow Your Calm Tree",
      description: "Watch your personal forest flourish as you meditate. Each session grows your trees and unlocks new peaceful environments.",
      color: "from-beige-400 to-beige-600"
    }
  ];
  const nextSlide = /* @__PURE__ */ __name(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem(`onboarding_${Date.now()}`, "true");
      onComplete();
    }
  }, "nextSlide");
  const skipOnboarding = /* @__PURE__ */ __name(() => {
    localStorage.setItem(`onboarding_${Date.now()}`, "true");
    onComplete();
  }, "skipOnboarding");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 right-6 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: skipOnboarding,
        className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors",
        children: "Skip"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-12 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-2", children: slides.map((_2, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: `h-2 rounded-full transition-all duration-300 ${index2 === currentSlide ? "w-8 bg-mint-500" : index2 < currentSlide ? "w-2 bg-mint-300" : "w-2 bg-gray-300 dark:bg-gray-600"}`,
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { delay: index2 * 0.1 }
      },
      index2
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
        transition: { duration: 0.5, ease: "easeInOut" },
        className: "text-center max-w-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0, rotate: -180 },
              animate: { scale: 1, rotate: 0 },
              transition: { duration: 0.8, delay: 0.2 },
              className: `w-24 h-24 mx-auto mb-8 bg-gradient-to-br ${slides[currentSlide].color} rounded-full flex items-center justify-center shadow-2xl`,
              children: React$1.createElement(slides[currentSlide].icon, {
                className: "w-12 h-12 text-white"
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.4 },
              className: "text-3xl font-bold text-gray-800 dark:text-white mb-6",
              children: slides[currentSlide].title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.6 },
              className: "text-lg text-gray-600 dark:text-gray-300 leading-relaxed",
              children: slides[currentSlide].description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1, delay: 0.8 },
              className: "mt-8 flex justify-center space-x-4",
              children: [...Array(3)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: {
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  },
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    delay: i2 * 0.3
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-mint-400" })
                },
                i2
              ))
            }
          )
        ]
      },
      currentSlide
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-12 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        onClick: nextSlide,
        className: "w-full max-w-md mx-auto flex items-center justify-center py-4 bg-gradient-to-r from-mint-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all",
        children: [
          currentSlide === slides.length - 1 ? "Let's Begin" : "Continue",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 ml-2" })
        ]
      }
    ) })
  ] });
}, "OnboardingFlow");
const UserContext = reactExports.createContext();
const useUser = /* @__PURE__ */ __name(() => {
  const context = reactExports.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}, "useUser");
const UserProvider = /* @__PURE__ */ __name(({ children }) => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = reactExports.useState({
    totalMeditations: 0,
    totalMinutes: 0,
    currentStreak: 0,
    trees: [],
    moodHistory: []
  });
  reactExports.useEffect(() => {
    if (user && !user.isGuest) {
      loadUserProgress();
    }
  }, [user]);
  const loadUserProgress = /* @__PURE__ */ __name(async () => {
    try {
      const sessionsQuery = `
        SELECT * FROM newschema_79bfc72e90c740979d0bdbefe1997145.meditation_sessions 
        WHERE user_id = $1 
        ORDER BY date DESC
      `;
      const sessionsResponse = await apiCall("/api_tools/templates/call_postgres", {
        query: sessionsQuery,
        params: [user.id]
      });
      const forestQuery = `
        SELECT * FROM newschema_79bfc72e90c740979d0bdbefe1997145.forest_progress 
        WHERE user_id = $1
      `;
      const forestResponse = await apiCall("/api_tools/templates/call_postgres", {
        query: forestQuery,
        params: [user.id]
      });
      const moodQuery = `
        SELECT * FROM newschema_79bfc72e90c740979d0bdbefe1997145.mood_checkins 
        WHERE user_id = $1 
        ORDER BY date DESC 
        LIMIT 30
      `;
      const moodResponse = await apiCall("/api_tools/templates/call_postgres", {
        query: moodQuery,
        params: [user.id]
      });
      const sessions = sessionsResponse.data || [];
      const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0);
      setUserProgress({
        totalMeditations: sessions.length,
        totalMinutes,
        currentStreak: calculateStreak(sessions),
        trees: forestResponse.data || [],
        moodHistory: moodResponse.data || []
      });
    } catch (error) {
      console.error("Error loading user progress:", error);
    }
  }, "loadUserProgress");
  const calculateStreak = /* @__PURE__ */ __name((sessions) => {
    if (sessions.length === 0)
      return 0;
    let streak = 0;
    const today = /* @__PURE__ */ new Date();
    for (let i2 = 0; i2 < sessions.length; i2++) {
      const sessionDate = new Date(sessions[i2].date);
      const daysDiff = Math.floor((today - sessionDate) / (1e3 * 60 * 60 * 24));
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }, "calculateStreak");
  const addMeditationSession = /* @__PURE__ */ __name(async (duration, mode, moodBefore, moodAfter, notes = "") => {
    if (user.isGuest) {
      setUserProgress((prev) => ({
        ...prev,
        totalMeditations: prev.totalMeditations + 1,
        totalMinutes: prev.totalMinutes + duration
      }));
      return;
    }
    try {
      const query = `
        INSERT INTO newschema_79bfc72e90c740979d0bdbefe1997145.meditation_sessions 
        (user_id, duration, mode, date, mood_before, mood_after, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      await apiCall("/api_tools/templates/call_postgres", {
        query,
        params: [user.id, duration, mode, (/* @__PURE__ */ new Date()).toISOString(), moodBefore, moodAfter, notes]
      });
      await addTreeGrowth(duration, mode);
      loadUserProgress();
    } catch (error) {
      console.error("Error adding meditation session:", error);
    }
  }, "addMeditationSession");
  const addTreeGrowth = /* @__PURE__ */ __name(async (duration, mode) => {
    try {
      const treeSpecies = getTreeSpeciesForMode(mode);
      const growthLevel = Math.floor(duration / 5);
      const query = `
        INSERT INTO newschema_79bfc72e90c740979d0bdbefe1997145.forest_progress 
        (user_id, tree_species, growth_level, unlock_date, environment_type)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      await apiCall("/api_tools/templates/call_postgres", {
        query,
        params: [user.id, treeSpecies, growthLevel, (/* @__PURE__ */ new Date()).toISOString(), mode]
      });
    } catch (error) {
      console.error("Error adding tree growth:", error);
    }
  }, "addTreeGrowth");
  const addMoodCheckin = /* @__PURE__ */ __name(async (moodRating, journalText = "") => {
    if (user.isGuest)
      return;
    try {
      const query = `
        INSERT INTO newschema_79bfc72e90c740979d0bdbefe1997145.mood_checkins 
        (user_id, date, mood_rating, journal_text)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      await apiCall("/api_tools/templates/call_postgres", {
        query,
        params: [user.id, (/* @__PURE__ */ new Date()).toISOString(), moodRating, journalText]
      });
      loadUserProgress();
    } catch (error) {
      console.error("Error adding mood check-in:", error);
    }
  }, "addMoodCheckin");
  const getTreeSpeciesForMode = /* @__PURE__ */ __name((mode) => {
    const species = {
      "calm-focus": "Serenity Oak",
      "deep-sleep": "Moonlight Willow",
      "focus-garden": "Mindful Pine",
      "breathing": "Zen Bamboo"
    };
    return species[mode] || "Peace Tree";
  }, "getTreeSpeciesForMode");
  const value = {
    userProgress,
    addMeditationSession,
    addMoodCheckin,
    loadUserProgress
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(UserContext.Provider, { value, children });
}, "UserProvider");
const InstantCalm = /* @__PURE__ */ __name(({ onClose }) => {
  const [isActive, setIsActive] = reactExports.useState(false);
  const [phase, setPhase] = reactExports.useState("inhale");
  const [timeLeft, setTimeLeft] = reactExports.useState(60);
  const breathingPattern = {
    inhale: 4,
    hold1: 2,
    exhale: 6,
    hold2: 2
  };
  reactExports.useEffect(() => {
    if (!isActive)
      return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, [isActive]);
  reactExports.useEffect(() => {
    if (!isActive)
      return;
    let phaseTimer;
    const cyclePhases = /* @__PURE__ */ __name(() => {
      const phases = ["inhale", "hold1", "exhale", "hold2"];
      let currentIndex = 0;
      const nextPhase = /* @__PURE__ */ __name(() => {
        setPhase(phases[currentIndex]);
        const duration = breathingPattern[phases[currentIndex]] * 1e3;
        phaseTimer = setTimeout(() => {
          currentIndex = (currentIndex + 1) % phases.length;
          nextPhase();
        }, duration);
      }, "nextPhase");
      nextPhase();
    }, "cyclePhases");
    cyclePhases();
    return () => {
      if (phaseTimer)
        clearTimeout(phaseTimer);
    };
  }, [isActive]);
  const getPhaseText = /* @__PURE__ */ __name(() => {
    switch (phase) {
      case "inhale":
        return "Breathe In";
      case "hold1":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      case "hold2":
        return "Hold";
      default:
        return "Breathe";
    }
  }, "getPhaseText");
  const getOrbScale = /* @__PURE__ */ __name(() => {
    switch (phase) {
      case "inhale":
        return 1.4;
      case "hold1":
        return 1.4;
      case "exhale":
        return 1;
      case "hold2":
        return 1;
      default:
        return 1;
    }
  }, "getOrbScale");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.9, opacity: 0 },
          onClick: (e2) => e2.stopPropagation(),
          className: "glass-card p-8 w-full max-w-sm text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onClose,
                className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800 dark:text-white mb-2", children: "Instant Calm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-8", children: timeLeft > 0 ? `${timeLeft}s remaining` : "Session complete! 🌸" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: {
                    scale: isActive ? getOrbScale() : 1,
                    opacity: [0.7, 1, 0.7]
                  },
                  transition: {
                    scale: {
                      duration: phase === "inhale" ? 4 : phase === "exhale" ? 6 : 2,
                      ease: "easeInOut"
                    },
                    opacity: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  },
                  className: "breathing-orb mx-auto"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  className: "absolute inset-0 flex items-center justify-center",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold text-lg", children: isActive ? getPhaseText() : "Ready" })
                },
                phase
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              timeLeft > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  onClick: () => setIsActive(!isActive),
                  className: "w-full py-3 bg-gradient-to-r from-mint-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg flex items-center justify-center space-x-2",
                  children: [
                    isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isActive ? "Pause" : "Start" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  onClick: onClose,
                  className: "w-full py-3 bg-gradient-to-r from-lavender-500 to-mint-500 text-white rounded-2xl font-semibold shadow-lg",
                  children: "Complete ✨"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "w-full py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors",
                  children: "Close"
                }
              )
            ] })
          ]
        }
      )
    }
  ) });
}, "InstantCalm");
const Dashboard = /* @__PURE__ */ __name(() => {
  const { user } = useAuth();
  const { userProgress, addMoodCheckin } = useUser();
  const [showInstantCalm, setShowInstantCalm] = reactExports.useState(false);
  const [dailyQuote, setDailyQuote] = reactExports.useState("");
  const [todaysMoodLogged, setTodaysMoodLogged] = reactExports.useState(false);
  const quotes = [
    "Peace comes from within. Do not seek it without. 🌸",
    "The present moment is the only time over which we have dominion. 🌿",
    "Breathe in peace, breathe out stress. 💨",
    "You are exactly where you need to be. 🌟",
    "Every breath is a new beginning. 🌱",
    "Calm mind brings inner strength and self-confidence. 💪",
    "In the midst of movement and chaos, keep stillness inside of you. 🧘‍♀️"
  ];
  const moodOptions = [
    { emoji: "😢", label: "Very Sad", value: 1, color: "from-red-400 to-red-600" },
    { emoji: "😔", label: "Sad", value: 2, color: "from-orange-400 to-orange-600" },
    { emoji: "😐", label: "Neutral", value: 3, color: "from-yellow-400 to-yellow-600" },
    { emoji: "😊", label: "Happy", value: 4, color: "from-mint-400 to-mint-600" },
    { emoji: "😄", label: "Very Happy", value: 5, color: "from-sky-400 to-sky-600" }
  ];
  reactExports.useEffect(() => {
    const today = (/* @__PURE__ */ new Date()).getDate();
    setDailyQuote(quotes[today % quotes.length]);
    const lastMoodDate = localStorage.getItem(`lastMoodDate_${user == null ? void 0 : user.id}`);
    const todayString = (/* @__PURE__ */ new Date()).toDateString();
    setTodaysMoodLogged(lastMoodDate === todayString);
  }, [user]);
  const handleMoodSelect = /* @__PURE__ */ __name(async (moodValue) => {
    await addMoodCheckin(moodValue);
    const todayString = (/* @__PURE__ */ new Date()).toDateString();
    localStorage.setItem(`lastMoodDate_${user == null ? void 0 : user.id}`, todayString);
    setTodaysMoodLogged(true);
  }, "handleMoodSelect");
  const getGreeting = /* @__PURE__ */ __name(() => {
    const hour = (/* @__PURE__ */ new Date()).getHours();
    if (hour < 12)
      return "Good morning";
    if (hour < 17)
      return "Good afternoon";
    return "Good evening";
  }, "getGreeting");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(12)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute rounded-full opacity-10",
        style: {
          width: `${60 + Math.random() * 120}px`,
          height: `${60 + Math.random() * 120}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `linear-gradient(45deg, ${["#a7f3d0", "#bae6fd", "#e9d5ff", "#faf2e1"][Math.floor(Math.random() * 4)]}, transparent)`
        },
        animate: {
          x: [0, 30, -30, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 180, 360]
        },
        transition: {
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5
        }
      },
      i2
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto space-y-6 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "text-center pt-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-gray-800 dark:text-white mb-2", children: [
              getGreeting(),
              ", ",
              (user == null ? void 0 : user.username) || "Friend",
              "! 👋"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "How are you feeling today?" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: 0.2 },
          className: "glass-card p-6 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-8 h-8 text-mint-500 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 dark:text-gray-300 italic", children: dailyQuote })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 },
          className: "glass-card p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "w-6 h-6 text-mint-500 mr-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-800 dark:text-white", children: "Daily Mood Check-in" })
            ] }),
            todaysMoodLogged ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2", children: "✅" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Mood logged for today! Come back tomorrow." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: moodOptions.map((mood) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                whileHover: { scale: 1.1 },
                whileTap: { scale: 0.9 },
                onClick: () => handleMoodSelect(mood.value),
                className: `aspect-square rounded-2xl bg-gradient-to-br ${mood.color} flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: mood.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-center leading-tight", children: mood.label })
                ]
              },
              mood.value
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
          className: "glass-card p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                onClick: () => setShowInstantCalm(true),
                className: "w-full py-6 bg-gradient-to-r from-lavender-400 to-sky-400 text-white rounded-2xl font-semibold shadow-lg flex items-center justify-center space-x-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "Instant Calm" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-gray-600 dark:text-gray-300 mt-3 text-sm", children: "Quick 1-minute breathing exercise" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.5 },
          className: "glass-card p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TreePine, { className: "w-6 h-6 text-mint-500 mr-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-800 dark:text-white", children: "Your Progress" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-mint-600 dark:text-mint-400", children: userProgress.totalMeditations }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Sessions" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-sky-600 dark:text-sky-400", children: userProgress.totalMinutes }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Minutes" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: [
                  "Calm Level ",
                  Math.floor(userProgress.totalMinutes / 60) + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-lavender-500" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { width: 0 },
                  animate: { width: `${userProgress.totalMinutes % 60 / 60 * 100}%` },
                  transition: { duration: 1, delay: 0.7 },
                  className: "h-3 bg-gradient-to-r from-mint-500 to-sky-500 rounded-full animate-glow"
                }
              ) })
            ] })
          ]
        }
      ),
      userProgress.trees.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.6 },
          className: "glass-card p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-white mb-3", children: "Your Growing Forest 🌳" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-2 overflow-x-auto", children: userProgress.trees.slice(0, 5).map((tree, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { scale: [1, 1.05, 1] },
                transition: { duration: 2, repeat: Infinity, delay: index2 * 0.2 },
                className: "flex-shrink-0 w-12 h-12 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full flex items-center justify-center",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TreePine, { className: "w-6 h-6 text-white" })
              },
              index2
            )) })
          ]
        }
      )
    ] }),
    showInstantCalm && /* @__PURE__ */ jsxRuntimeExports.jsx(InstantCalm, { onClose: () => setShowInstantCalm(false) })
  ] });
}, "Dashboard");
const MeditationSession = /* @__PURE__ */ __name(({ mode, onComplete }) => {
  const { addMeditationSession } = useUser();
  const [isActive, setIsActive] = reactExports.useState(false);
  const [timeElapsed, setTimeElapsed] = reactExports.useState(0);
  const [selectedDuration, setSelectedDuration] = reactExports.useState(300);
  const [customDuration, setCustomDuration] = reactExports.useState(5);
  const [phase, setPhase] = reactExports.useState("setup");
  const [breathingPhase, setBreathingPhase] = reactExports.useState("inhale");
  const [moodBefore, setMoodBefore] = reactExports.useState(3);
  const [moodAfter, setMoodAfter] = reactExports.useState(3);
  const [treeGrowth, setTreeGrowth] = reactExports.useState(0);
  const quickDurations = [
    { label: "1 min", value: 60 },
    { label: "5 min", value: 300 },
    { label: "10 min", value: 600 },
    { label: "15 min", value: 900 },
    { label: "20 min", value: 1200 },
    { label: "30 min", value: 1800 }
  ];
  reactExports.useEffect(() => {
    if (!isActive || phase !== "active")
      return;
    const timer = setInterval(() => {
      setTimeElapsed((prev) => {
        const newTime = prev + 1;
        setTreeGrowth(Math.min(newTime / selectedDuration * 100, 100));
        if (newTime >= selectedDuration) {
          setIsActive(false);
          setPhase("complete");
          return newTime;
        }
        return newTime;
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, [isActive, selectedDuration, phase]);
  reactExports.useEffect(() => {
    if (!isActive || mode.id !== "breathing")
      return;
    const breathingCycle = /* @__PURE__ */ __name(() => {
      const phases = ["inhale", "hold", "exhale", "hold"];
      const durations = [4e3, 2e3, 6e3, 2e3];
      let currentIndex = 0;
      const nextPhase = /* @__PURE__ */ __name(() => {
        setBreathingPhase(phases[currentIndex]);
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % phases.length;
          nextPhase();
        }, durations[currentIndex]);
      }, "nextPhase");
      nextPhase();
    }, "breathingCycle");
    breathingCycle();
  }, [isActive, mode.id]);
  const startSession = /* @__PURE__ */ __name(() => {
    setPhase("active");
    setIsActive(true);
    setTimeElapsed(0);
    setTreeGrowth(0);
  }, "startSession");
  const pauseSession = /* @__PURE__ */ __name(() => {
    setIsActive(!isActive);
  }, "pauseSession");
  const resetSession = /* @__PURE__ */ __name(() => {
    setIsActive(false);
    setTimeElapsed(0);
    setTreeGrowth(0);
    setPhase("setup");
  }, "resetSession");
  const completeSession = /* @__PURE__ */ __name(async () => {
    const minutes = Math.floor(timeElapsed / 60);
    await addMeditationSession(minutes, mode.id, moodBefore, moodAfter);
    zt.success(`🌱 Great session! You meditated for ${minutes} minutes and your tree grew!`);
    onComplete();
  }, "completeSession");
  const formatTime = /* @__PURE__ */ __name((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, "formatTime");
  const getBreathingText = /* @__PURE__ */ __name(() => {
    switch (breathingPhase) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      default:
        return "Breathe";
    }
  }, "getBreathingText");
  const getOrbScale = /* @__PURE__ */ __name(() => {
    if (mode.id !== "breathing")
      return 1 + treeGrowth / 200;
    return breathingPhase === "inhale" || breathingPhase === "hold" ? 1.4 : 1;
  }, "getOrbScale");
  const getBackgroundGradient = /* @__PURE__ */ __name(() => {
    switch (mode.id) {
      case "calm-focus":
        return "from-mint-100 via-mint-50 to-sky-50 dark:from-mint-900 dark:via-gray-800 dark:to-gray-900";
      case "deep-sleep":
        return "from-sky-100 via-indigo-50 to-purple-50 dark:from-sky-900 dark:via-gray-800 dark:to-gray-900";
      case "focus-garden":
        return "from-lavender-100 via-purple-50 to-pink-50 dark:from-lavender-900 dark:via-gray-800 dark:to-gray-900";
      case "breathing":
        return "from-beige-100 via-yellow-50 to-orange-50 dark:from-beige-900 dark:via-gray-800 dark:to-gray-900";
      default:
        return "from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900";
    }
  }, "getBackgroundGradient");
  const adjustCustomTime = /* @__PURE__ */ __name((increment) => {
    const newTime = Math.max(1, Math.min(60, customDuration + increment));
    setCustomDuration(newTime);
    setSelectedDuration(newTime * 60);
  }, "adjustCustomTime");
  if (phase === "setup") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-screen bg-gradient-to-br ${getBackgroundGradient()} p-4 flex items-center justify-center relative overflow-hidden`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(8)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute rounded-full opacity-20",
          style: {
            width: `${80 + Math.random() * 160}px`,
            height: `${80 + Math.random() * 160}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(45deg, ${["#a7f3d0", "#bae6fd", "#e9d5ff", "#faf2e1"][Math.floor(Math.random() * 4)]}, transparent)`
          },
          animate: {
            x: [0, 40, -40, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.3, 0.7, 1],
            rotate: [0, 180, 360]
          },
          transition: {
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }
        },
        i2
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          className: "glass-card p-8 w-full max-w-md relative z-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onComplete,
                className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { rotate: [0, 5, -5, 0] },
                  transition: { duration: 4, repeat: Infinity },
                  className: `w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${mode.color} rounded-2xl flex items-center justify-center shadow-lg`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(mode.icon, { className: "w-8 h-8 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800 dark:text-white mb-2", children: mode.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: mode.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-white mb-3", children: "Choose Duration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-4", children: quickDurations.map((duration) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  onClick: () => {
                    setSelectedDuration(duration.value);
                    setCustomDuration(duration.value / 60);
                  },
                  className: `py-2 px-3 rounded-xl font-semibold transition-all ${selectedDuration === duration.value ? "bg-gradient-to-r from-mint-500 to-sky-500 text-white shadow-lg" : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70"}`,
                  children: duration.label
                },
                duration.value
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/30 dark:bg-gray-800/30 rounded-2xl p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Custom Duration" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center space-x-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      whileHover: { scale: 1.1 },
                      whileTap: { scale: 0.9 },
                      onClick: () => adjustCustomTime(-1),
                      className: "w-10 h-10 bg-white/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-gray-800 dark:text-white", children: customDuration }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: customDuration === 1 ? "minute" : "minutes" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      whileHover: { scale: 1.1 },
                      whileTap: { scale: 0.9 },
                      onClick: () => adjustCustomTime(1),
                      className: "w-10 h-10 bg-white/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-white mb-3", children: "How do you feel right now?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between", children: ["😢", "😔", "😐", "😊", "😄"].map((emoji, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  whileHover: { scale: 1.2 },
                  whileTap: { scale: 0.9 },
                  onClick: () => setMoodBefore(index2 + 1),
                  className: `text-3xl p-2 rounded-full transition-all ${moodBefore === index2 + 1 ? "bg-mint-200 dark:bg-mint-800" : ""}`,
                  children: emoji
                },
                index2
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                onClick: startSession,
                className: "w-full py-4 bg-gradient-to-r from-mint-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg flex items-center justify-center space-x-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Begin Meditation" })
                ]
              }
            )
          ]
        }
      )
    ] });
  }
  if (phase === "active") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-screen bg-gradient-to-br ${getBackgroundGradient()} p-4 flex flex-col items-center justify-center relative overflow-hidden`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(6)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute rounded-full opacity-10",
          style: {
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`
          },
          animate: {
            x: [0, 50, -50, 0],
            y: [0, -60, 60, 0],
            scale: [1, 1.4, 0.6, 1],
            opacity: [0.1, 0.3, 0.1]
          },
          transition: {
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10
          }
        },
        i2
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-6 left-6 right-6 flex justify-between items-center z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: mode.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs opacity-75", children: [
            formatTime(timeElapsed),
            " / ",
            formatTime(selectedDuration)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onComplete,
            className: "text-white/60 hover:text-white/80 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-6 right-6 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-white/20 rounded-full h-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { width: 0 },
          animate: { width: `${timeElapsed / selectedDuration * 100}%` },
          className: "h-1 bg-white/60 rounded-full"
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: {
                scale: getOrbScale(),
                opacity: [0.7, 1, 0.7]
              },
              transition: {
                scale: {
                  duration: mode.id === "breathing" ? breathingPhase === "inhale" ? 4 : breathingPhase === "exhale" ? 6 : 2 : 3,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              },
              className: "w-40 h-40 mx-auto bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: {
                    scale: [1, 1 + treeGrowth / 100 * 0.5, 1],
                    rotate: [0, treeGrowth / 10, 0]
                  },
                  transition: { duration: 2, repeat: Infinity },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TreePine, { className: "w-16 h-16 text-white/80" })
                }
              )
            }
          ),
          treeGrowth > 20 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", children: [...Array(Math.floor(treeGrowth / 20))].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute w-2 h-2 bg-mint-400 rounded-full",
              style: {
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`
              },
              animate: {
                y: [-10, -30, -10],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              },
              transition: {
                duration: 3,
                repeat: Infinity,
                delay: i2 * 0.5
              }
            },
            i2
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            className: "text-white mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-light mb-2", children: mode.id === "breathing" ? getBreathingText() : "Stay Present" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70", children: mode.id === "breathing" ? "Follow the rhythm" : "Watch your tree grow with each breath" })
            ]
          },
          breathingPhase
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white/60 text-lg font-mono mb-8", children: [
          formatTime(selectedDuration - timeElapsed),
          " remaining"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white/50 text-sm", children: [
          "Tree Growth: ",
          Math.round(treeGrowth),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-8 left-6 right-6 flex justify-center space-x-4 z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            onClick: pauseSession,
            className: "w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:bg-white/30 transition-all",
            children: isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            onClick: resetSession,
            className: "w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:bg-white/30 transition-all",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-6 h-6" })
          }
        )
      ] })
    ] });
  }
  if (phase === "complete") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-screen bg-gradient-to-br ${getBackgroundGradient()} p-4 flex items-center justify-center relative overflow-hidden`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(20)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute w-4 h-4 bg-mint-400 rounded-full",
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          },
          animate: {
            y: [-20, -100],
            opacity: [1, 0],
            scale: [0, 1, 0]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }
        },
        i2
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          className: "glass-card p-8 w-full max-w-md text-center relative z-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: { delay: 0.2, type: "spring" },
                className: "text-6xl mb-4",
                children: "🌸"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800 dark:text-white mb-2", children: "Beautiful Session!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 dark:text-gray-300 mb-6", children: [
              "You meditated for ",
              Math.floor(timeElapsed / 60),
              " minutes. Your tree has grown ",
              Math.round(treeGrowth),
              "%! 🌱"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-white mb-3", children: "How do you feel now?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between", children: ["😢", "😔", "😐", "😊", "😄"].map((emoji, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  whileHover: { scale: 1.2 },
                  whileTap: { scale: 0.9 },
                  onClick: () => setMoodAfter(index2 + 1),
                  className: `text-3xl p-2 rounded-full transition-all ${moodAfter === index2 + 1 ? "bg-mint-200 dark:bg-mint-800" : ""}`,
                  children: emoji
                },
                index2
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                onClick: completeSession,
                className: "w-full py-4 bg-gradient-to-r from-mint-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg mb-4",
                children: "Complete Session ✨"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: resetSession,
                className: "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors",
                children: "Meditate Again"
              }
            )
          ]
        }
      )
    ] });
  }
}, "MeditationSession");
const MeditationHub = /* @__PURE__ */ __name(() => {
  const [selectedMode, setSelectedMode] = reactExports.useState(null);
  const [showSession, setShowSession] = reactExports.useState(false);
  const meditationModes = [
    {
      id: "calm-focus",
      title: "Calm Focus",
      description: "Guided breathing with ambient nature sounds",
      icon: TreePine,
      color: "from-mint-400 to-mint-600",
      duration: "5-30 min",
      benefits: ["Reduces stress", "Improves focus", "Calms mind"]
    },
    {
      id: "deep-sleep",
      title: "Deep Sleep",
      description: "Peaceful sounds and gentle guidance for rest",
      icon: Moon,
      color: "from-sky-400 to-sky-600",
      duration: "10-60 min",
      benefits: ["Better sleep", "Relaxation", "Night peace"]
    },
    {
      id: "focus-garden",
      title: "Focus Garden",
      description: "Mindfulness challenge to stay present",
      icon: Focus,
      color: "from-lavender-400 to-lavender-600",
      duration: "3-15 min",
      benefits: ["Mindfulness", "Concentration", "Awareness"]
    },
    {
      id: "breathing",
      title: "Breathing Space",
      description: "Simple breathing exercises for instant calm",
      icon: Zap,
      color: "from-beige-400 to-beige-600",
      duration: "1-10 min",
      benefits: ["Quick relief", "Energy boost", "Clarity"]
    }
  ];
  const startMeditation = /* @__PURE__ */ __name((mode) => {
    setSelectedMode(mode);
    setShowSession(true);
  }, "startMeditation");
  if (showSession && selectedMode) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MeditationSession,
      {
        mode: selectedMode,
        onComplete: () => {
          setShowSession(false);
          setSelectedMode(null);
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "text-center pt-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold gradient-text mb-2", children: "Meditation Garden" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Choose your path to inner peace" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: 0.2 },
        className: "glass-card p-6 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center space-x-2 mb-4", children: [...Array(5)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: {
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              },
              transition: {
                duration: 3,
                repeat: Infinity,
                delay: i2 * 0.2
              },
              className: "w-8 h-8 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TreePine, { className: "w-4 h-4 text-white" })
            },
            i2
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Your forest grows with each meditation session 🌱" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: meditationModes.map((mode, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 + index2 * 0.1 },
        className: "glass-card p-6 hover:shadow-xl transition-all cursor-pointer",
        onClick: () => startMeditation(mode),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              whileHover: { scale: 1.1, rotate: 5 },
              className: `w-12 h-12 bg-gradient-to-br ${mode.color} rounded-2xl flex items-center justify-center shadow-lg`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(mode.icon, { className: "w-6 h-6 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-white", children: mode.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 mr-1" }),
                mode.duration
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm mb-3", children: mode.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: mode.benefits.map((benefit, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full text-xs text-gray-600 dark:text-gray-300",
                children: benefit
              },
              i2
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                className: "flex items-center space-x-2 text-mint-600 dark:text-mint-400 font-semibold",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Start Session" })
                ]
              }
            )
          ] })
        ] })
      },
      mode.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.7 },
        className: "glass-card p-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-white mb-4", children: "Today's Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-mint-600 dark:text-mint-400", children: "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Sessions" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-sky-600 dark:text-sky-400", children: "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Minutes" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-lavender-600 dark:text-lavender-400", children: "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Trees" })
            ] })
          ] })
        ]
      }
    )
  ] }) });
}, "MeditationHub");
const ChatBot = /* @__PURE__ */ __name(() => {
  const [messages, setMessages] = reactExports.useState([]);
  const [inputMessage, setInputMessage] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [agentId, setAgentId] = reactExports.useState(null);
  const [isInitializing, setIsInitializing] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    initializeAgent();
  }, []);
  reactExports.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const initializeAgent = /* @__PURE__ */ __name(async () => {
    if (isInitializing)
      return;
    setIsInitializing(true);
    try {
      const instructions = `You are MindBot, a caring and empathetic AI companion for the MindEase mental wellness app. You provide gentle emotional support, listen actively, and offer comfort to users dealing with stress, anxiety, or difficult emotions. You can help with:

- Emotional support and active listening
- Stress and anxiety management techniques
- Mindfulness and breathing exercises
- Sleep and relaxation guidance
- Motivation and positive reinforcement
- Crisis support and resource referrals

Always respond with warmth, understanding, and positivity. Keep responses conversational and supportive. If someone mentions crisis keywords like "panic", "self-harm", or "suicide", immediately express concern and suggest they seek professional help while offering immediate coping strategies.

Be gentle, non-judgmental, and focus on the user's wellbeing. Offer practical techniques when appropriate, but always validate their feelings first.`;
      const response = await createAgent(instructions, "MindBot - Wellness Companion");
      if (response && response.agent_id) {
        setAgentId(response.agent_id);
        const welcomeMessage = "Hi there! I'm MindBot, your caring wellness companion. I'm here to listen, support you, and help you navigate through stress, anxiety, or any emotions you're experiencing. How are you feeling today? 💙";
        setMessages([{
          id: Date.now(),
          text: welcomeMessage,
          sender: "bot",
          timestamp: /* @__PURE__ */ new Date()
        }]);
      } else {
        throw new Error("Failed to create agent");
      }
    } catch (error) {
      console.error("Error initializing agent:", error);
      zt.error("Failed to initialize chat. Please try again.");
      const fallbackMessage = {
        id: Date.now(),
        text: "I'm having trouble connecting right now, but I'm still here for you. How are you feeling today?",
        sender: "bot",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages([fallbackMessage]);
    } finally {
      setIsInitializing(false);
    }
  }, "initializeAgent");
  const scrollToBottom = /* @__PURE__ */ __name(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, "scrollToBottom");
  const sendMessage = /* @__PURE__ */ __name(async () => {
    if (!inputMessage.trim() || isLoading || isInitializing)
      return;
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    try {
      const crisisKeywords = ["panic", "self-harm", "suicide", "kill myself", "end it all", "can't go on"];
      const hasCrisisKeyword = crisisKeywords.some(
        (keyword) => inputMessage.toLowerCase().includes(keyword)
      );
      if (hasCrisisKeyword) {
        const crisisResponse = {
          id: Date.now() + 1,
          text: "I'm really concerned about you right now. Please know that you're not alone and there are people who want to help. If you're in immediate danger, please contact emergency services (112) or a crisis helpline. In India, you can reach:\n\n• AASRA: 91-22-27546669\n• Sneha: 044-24640050\n• Vandrevala Foundation: 1860-2662-345\n\nWould you like to talk about what's troubling you, or would you prefer some grounding exercises to help you feel safer right now?",
          sender: "bot",
          timestamp: /* @__PURE__ */ new Date(),
          isCrisis: true
        };
        setMessages((prev) => [...prev, crisisResponse]);
        setIsLoading(false);
        return;
      }
      if (agentId) {
        const response = await chatWithAgent(agentId, inputMessage);
        const botMessage = {
          id: Date.now() + 1,
          text: response.response || "I'm here to listen. Can you tell me more about how you're feeling?",
          sender: "bot",
          timestamp: /* @__PURE__ */ new Date()
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("No valid agent available");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now, but I'm still here for you. Sometimes taking a few deep breaths can help while we wait. How are you feeling in this moment?",
        sender: "bot",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, "sendMessage");
  const handleKeyPress = /* @__PURE__ */ __name((e2) => {
    if (e2.key === "Enter" && !e2.shiftKey) {
      e2.preventDefault();
      sendMessage();
    }
  }, "handleKeyPress");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(10)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute rounded-full opacity-10",
        style: {
          width: `${60 + Math.random() * 120}px`,
          height: `${60 + Math.random() * 120}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `linear-gradient(45deg, ${["#a7f3d0", "#bae6fd", "#e9d5ff", "#faf2e1"][Math.floor(Math.random() * 4)]}, transparent)`
        },
        animate: {
          x: [0, 30, -30, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 180, 360]
        },
        transition: {
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5
        }
      },
      i2
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-white/20 dark:border-gray-700/20 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: { rotate: [0, 5, -5, 0] },
            transition: { duration: 4, repeat: Infinity },
            className: "w-10 h-10 bg-gradient-to-br from-mint-400 to-sky-600 rounded-full flex items-center justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-5 h-5 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold text-gray-800 dark:text-white", children: "MindBot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Your wellness companion" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2 h-2 rounded-full ${isInitializing ? "bg-yellow-500 animate-pulse" : "bg-green-500 animate-pulse"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: isInitializing ? "Connecting..." : "Online" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto p-4 pb-24 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: messages.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          className: `flex ${message.sender === "user" ? "justify-end" : "justify-start"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === "user" ? "bg-gradient-to-br from-mint-400 to-sky-400" : "bg-gradient-to-br from-mint-400 to-sky-600"}`, children: message.sender === "user" ? /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-4 py-3 rounded-2xl shadow-sm ${message.sender === "user" ? "bg-gradient-to-r from-mint-500 to-sky-500 text-white" : message.isCrisis ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800" : "bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-gray-200"} ${message.sender === "user" ? "rounded-br-md" : "rounded-bl-md"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed whitespace-pre-wrap", children: message.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs mt-2 opacity-70 ${message.sender === "user" ? "text-white" : "text-gray-500 dark:text-gray-400"}`, children: message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              }) })
            ] })
          ] })
        },
        message.id
      )) }),
      (isLoading || isInitializing) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "flex justify-start",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-mint-400 to-sky-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/70 dark:bg-gray-800/70 px-4 py-3 rounded-2xl rounded-bl-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-1", children: [...Array(3)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { scale: [1, 1.2, 1] },
                transition: { duration: 1, repeat: Infinity, delay: i2 * 0.2 },
                className: "w-2 h-2 bg-gray-400 rounded-full"
              },
              i2
            )) }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-20 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/20 p-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end space-x-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: inputMessage,
          onChange: (e2) => setInputMessage(e2.target.value),
          onKeyPress: handleKeyPress,
          placeholder: "Share what's on your mind...",
          className: "w-full px-4 py-3 bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint-400 resize-none max-h-32",
          rows: "1",
          disabled: isLoading || isInitializing
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          onClick: sendMessage,
          disabled: !inputMessage.trim() || isLoading || isInitializing,
          className: `w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${inputMessage.trim() && !isLoading && !isInitializing ? "bg-gradient-to-r from-mint-400 to-sky-600 text-white hover:shadow-xl" : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"}`,
          children: isLoading || isInitializing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5" })
        }
      )
    ] }) }) })
  ] });
}, "ChatBot");
const Community = /* @__PURE__ */ __name(() => {
  var _a, _b;
  const [selectedRoom, setSelectedRoom] = reactExports.useState("calm-zone");
  const [message, setMessage] = reactExports.useState("");
  const [messages, setMessages] = reactExports.useState({
    "calm-zone": [],
    "motivation-zone": [],
    "sleep-zone": []
  });
  const rooms = [
    {
      id: "calm-zone",
      name: "Calm Zone",
      description: "Share peaceful moments and gentle support",
      icon: Heart,
      color: "from-mint-400 to-mint-600",
      members: 234
    },
    {
      id: "motivation-zone",
      name: "Motivation Zone",
      description: "Celebrate progress and inspire each other",
      icon: Users,
      color: "from-sky-400 to-sky-600",
      members: 189
    },
    {
      id: "sleep-zone",
      name: "Sleep Zone",
      description: "Rest, relaxation, and peaceful nights",
      icon: MessageCircle,
      color: "from-lavender-400 to-lavender-600",
      members: 156
    }
  ];
  const sendMessage = /* @__PURE__ */ __name(() => {
    if (!message.trim())
      return;
    const newMessage = {
      id: Date.now(),
      user: "You",
      message,
      time: "now",
      reactions: { hearts: 0, flowers: 0 }
    };
    setMessages((prev) => ({
      ...prev,
      [selectedRoom]: [...prev[selectedRoom], newMessage]
    }));
    setMessage("");
  }, "sendMessage");
  const addReaction = /* @__PURE__ */ __name((messageId, type) => {
    setMessages((prev) => ({
      ...prev,
      [selectedRoom]: prev[selectedRoom].map(
        (msg) => msg.id === messageId ? { ...msg, reactions: { ...msg.reactions, [type]: msg.reactions[type] + 1 } } : msg
      )
    }));
  }, "addReaction");
  const currentRoom = rooms.find((room) => room.id === selectedRoom);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(8)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute rounded-full opacity-10",
        style: {
          width: `${80 + Math.random() * 160}px`,
          height: `${80 + Math.random() * 160}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `linear-gradient(45deg, ${["#a7f3d0", "#bae6fd", "#e9d5ff", "#faf2e1"][Math.floor(Math.random() * 4)]}, transparent)`
        },
        animate: {
          x: [0, 40, -40, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.3, 0.7, 1],
          rotate: [0, 180, 360]
        },
        transition: {
          duration: 20 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5
        }
      },
      i2
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-white/20 dark:border-gray-700/20 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold gradient-text mb-2", children: "Community" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm", children: "Connect with others on their wellness journey" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-2 overflow-x-auto pb-2", children: rooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          onClick: () => setSelectedRoom(room.id),
          className: `flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${selectedRoom === room.id ? `bg-gradient-to-r ${room.color} text-white shadow-lg` : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(room.icon, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: room.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs opacity-75", children: [
              "(",
              room.members,
              ")"
            ] })
          ] })
        },
        room.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto p-4 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "glass-card p-4 mb-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 bg-gradient-to-br ${currentRoom.color} rounded-full flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(currentRoom.icon, { className: "w-5 h-5 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-800 dark:text-white", children: currentRoom.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: currentRoom.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                currentRoom.members,
                " members online"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Moderated" })
              ] })
            ] })
          ]
        },
        selectedRoom
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mb-24", children: ((_a = messages[selectedRoom]) == null ? void 0 : _a.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "🌱" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-gray-800 dark:text-white mb-2", children: [
          "Welcome to ",
          currentRoom.name,
          "!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm", children: "Be the first to share something positive and start a conversation." })
      ] }) : (_b = messages[selectedRoom]) == null ? void 0 : _b.map((msg, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: index2 * 0.1 },
          className: `glass-card p-4 ${msg.user === "You" ? "bg-mint-100/50 dark:bg-mint-900/20" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-semibold", children: msg.user.charAt(0) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800 dark:text-white text-sm", children: msg.user }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400 ml-2", children: msg.time })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 dark:text-gray-300 mb-3 leading-relaxed", children: msg.message }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.1 },
                  whileTap: { scale: 0.9 },
                  onClick: () => addReaction(msg.id, "hearts"),
                  className: "flex items-center space-x-1 text-pink-500 hover:text-pink-600 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: msg.reactions.hearts })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.1 },
                  whileTap: { scale: 0.9 },
                  onClick: () => addReaction(msg.id, "flowers"),
                  className: "flex items-center space-x-1 text-purple-500 hover:text-purple-600 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Flower, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: msg.reactions.flowers })
                  ]
                }
              )
            ] })
          ]
        },
        msg.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-20 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/20 p-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end space-x-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: message,
            onChange: (e2) => setMessage(e2.target.value),
            placeholder: "Share something positive...",
            className: "w-full px-4 py-3 bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint-400 resize-none max-h-32",
            rows: "1"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            onClick: sendMessage,
            disabled: !message.trim(),
            className: `w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${message.trim() ? `bg-gradient-to-r ${currentRoom.color} text-white hover:shadow-xl` : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-2 text-center", children: "Be kind and supportive. All messages are moderated by AI for safety." })
    ] }) })
  ] });
}, "Community");
const ThemeContext = reactExports.createContext();
const useTheme = /* @__PURE__ */ __name(() => {
  const context = reactExports.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}, "useTheme");
const ThemeProvider = /* @__PURE__ */ __name(({ children }) => {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const savedTheme = localStorage.getItem("mindeease_theme") || "light";
    setTheme(savedTheme);
    updateTheme(savedTheme);
  }, []);
  const updateTheme = /* @__PURE__ */ __name((newTheme) => {
    document.documentElement.classList.remove("dark", "zen-pastel");
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.removeProperty("--zen-bg");
      document.documentElement.style.removeProperty("--zen-card");
      document.documentElement.style.removeProperty("--zen-text");
      document.documentElement.style.removeProperty("--zen-accent");
    } else if (newTheme === "zen") {
      document.documentElement.classList.add("zen-pastel");
      document.documentElement.style.setProperty("--zen-bg", "linear-gradient(135deg, #f0fdf4, #ecfdf5, #f0f9ff, #faf5ff)");
      document.documentElement.style.setProperty("--zen-card", "rgba(255, 255, 255, 0.85)");
      document.documentElement.style.setProperty("--zen-text", "#1f2937");
      document.documentElement.style.setProperty("--zen-accent", "#10b981");
      document.documentElement.style.setProperty("--zen-secondary", "#06b6d4");
      document.documentElement.style.setProperty("--zen-tertiary", "#8b5cf6");
    } else {
      document.documentElement.style.removeProperty("--zen-bg");
      document.documentElement.style.removeProperty("--zen-card");
      document.documentElement.style.removeProperty("--zen-text");
      document.documentElement.style.removeProperty("--zen-accent");
      document.documentElement.style.removeProperty("--zen-secondary");
      document.documentElement.style.removeProperty("--zen-tertiary");
    }
  }, "updateTheme");
  const toggleTheme = /* @__PURE__ */ __name(() => {
    const newTheme = theme === "light" ? "dark" : theme === "dark" ? "zen" : "light";
    setTheme(newTheme);
    localStorage.setItem("mindeease_theme", newTheme);
    updateTheme(newTheme);
  }, "toggleTheme");
  const setSpecificTheme = /* @__PURE__ */ __name((newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("mindeease_theme", newTheme);
    updateTheme(newTheme);
  }, "setSpecificTheme");
  const value = {
    theme,
    toggleTheme,
    setSpecificTheme
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value, children });
}, "ThemeProvider");
const Settings = /* @__PURE__ */ __name(() => {
  const { user, logout } = useAuth();
  const { theme, setSpecificTheme } = useTheme();
  const [activeSection, setActiveSection] = reactExports.useState("profile");
  const [notifications, setNotifications] = reactExports.useState({
    meditation: true,
    mood: true,
    quotes: false,
    sleep: true
  });
  const [privacy, setPrivacy] = reactExports.useState({
    anonymous: true,
    encryption: true
  });
  const handleLogout = /* @__PURE__ */ __name(() => {
    logout();
    zt.success("Logged out successfully");
  }, "handleLogout");
  const toggleNotification = /* @__PURE__ */ __name((key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    zt.success(`${key} notifications ${notifications[key] ? "disabled" : "enabled"}`);
  }, "toggleNotification");
  const togglePrivacy = /* @__PURE__ */ __name((key) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    zt.success(`${key} ${privacy[key] ? "disabled" : "enabled"}`);
  }, "togglePrivacy");
  const sections = [
    { id: "profile", name: "Profile", icon: User },
    { id: "appearance", name: "Theme", icon: Palette },
    { id: "notifications", name: "Alerts", icon: Bell },
    { id: "privacy", name: "Safety", icon: Shield },
    { id: "about", name: "About", icon: Info }
  ];
  const renderProfileSection = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          whileHover: { scale: 1.05 },
          className: "w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-mint-400 to-sky-400 rounded-full flex items-center justify-center cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-10 h-10 text-white" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-800 dark:text-white mb-1", children: (user == null ? void 0 : user.username) || "Guest User" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm mb-2", children: (user == null ? void 0 : user.email) || "guest@mindeease.com" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-mint-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-mint-600 dark:text-mint-400 font-medium", children: [
          "Level ",
          (user == null ? void 0 : user.calm_level) || 1,
          " - Peaceful Mind"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white mb-3", children: "Your Journey" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-mint-600 dark:text-mint-400", children: (user == null ? void 0 : user.total_points) || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: "MindEase Points" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-sky-600 dark:text-sky-400", children: "0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Days Streak" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white", children: "Mood Quote" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4 text-gray-400" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 italic text-sm", children: '"Taking it one breath at a time 🌸"' })
    ] })
  ] }), "renderProfileSection");
  const renderAppearanceSection = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white mb-3", children: "Theme Selection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
        {
          id: "light",
          name: "Light Mode",
          icon: Sun,
          desc: "Bright and energizing",
          preview: "bg-gradient-to-r from-white to-gray-100",
          textColor: "text-gray-800"
        },
        {
          id: "dark",
          name: "Dark Mode",
          icon: Moon,
          desc: "Easy on the eyes",
          preview: "bg-gradient-to-r from-gray-800 to-gray-900",
          textColor: "text-white"
        },
        {
          id: "zen",
          name: "Zen Pastel",
          icon: Palette,
          desc: "Soft and calming",
          preview: "bg-gradient-to-r from-mint-100 via-sky-100 to-lavender-100",
          textColor: "text-gray-700"
        }
      ].map((themeOption) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          onClick: () => {
            setSpecificTheme(themeOption.id);
            zt.success(`Switched to ${themeOption.name}`);
          },
          className: `w-full p-4 rounded-2xl border-2 transition-all relative overflow-hidden ${theme === themeOption.id ? "border-mint-500 shadow-lg" : "border-gray-200 dark:border-gray-700 hover:border-mint-300"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 ${themeOption.preview} opacity-20` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center space-x-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center ${theme === themeOption.id ? "bg-mint-500 text-white" : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(themeOption.icon, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gray-800 dark:text-white", children: themeOption.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: themeOption.desc })
              ] }),
              theme === themeOption.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  className: "w-6 h-6 bg-mint-500 rounded-full flex items-center justify-center",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-white" })
                }
              )
            ] })
          ]
        },
        themeOption.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white mb-3", children: "Visual Effects" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-800 dark:text-white text-sm", children: "Animated Backgrounds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Floating particles and gradients" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            whileTap: { scale: 0.95 },
            className: "w-12 h-6 bg-mint-500 rounded-full relative cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm",
                animate: { x: 26 },
                transition: { type: "spring", stiffness: 500, damping: 30 }
              }
            )
          }
        )
      ] })
    ] })
  ] }), "renderAppearanceSection");
  const renderNotificationsSection = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white mb-4", children: "Wellness Reminders" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [
      { key: "meditation", name: "Daily Meditation", desc: "Gentle reminders to meditate" },
      { key: "mood", name: "Mood Check-ins", desc: "Daily emotional wellness check" },
      { key: "quotes", name: "Motivational Quotes", desc: "Inspiring messages throughout the day" },
      { key: "sleep", name: "Sleep Reminders", desc: "Wind-down notifications" }
    ].map((notification) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-800 dark:text-white text-sm", children: notification.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: notification.desc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          whileTap: { scale: 0.95 },
          onClick: () => toggleNotification(notification.key),
          className: `w-12 h-6 rounded-full relative transition-colors ${notifications[notification.key] ? "bg-mint-500" : "bg-gray-300 dark:bg-gray-600"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm",
              animate: {
                x: notifications[notification.key] ? 26 : 2
              },
              transition: { type: "spring", stiffness: 500, damping: 30 }
            }
          )
        }
      )
    ] }, notification.key)) })
  ] }) }), "renderNotificationsSection");
  const renderPrivacySection = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white mb-4", children: "Data & Privacy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-800 dark:text-white text-sm", children: "Anonymous Community" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Hide your identity in community chats" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              whileTap: { scale: 0.95 },
              onClick: () => togglePrivacy("anonymous"),
              className: `w-12 h-6 rounded-full relative transition-colors ${privacy.anonymous ? "bg-mint-500" : "bg-gray-300 dark:bg-gray-600"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm",
                  animate: {
                    x: privacy.anonymous ? 26 : 2
                  },
                  transition: { type: "spring", stiffness: 500, damping: 30 }
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-800 dark:text-white text-sm", children: "Data Encryption" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: "All data is encrypted and secure" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              whileTap: { scale: 0.95 },
              onClick: () => togglePrivacy("encryption"),
              className: `w-12 h-6 rounded-full relative transition-colors ${privacy.encryption ? "bg-mint-500" : "bg-gray-300 dark:bg-gray-600"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm",
                  animate: {
                    x: privacy.encryption ? 26 : 2
                  },
                  transition: { type: "spring", stiffness: 500, damping: 30 }
                }
              )
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 text-red-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white", children: "Crisis Support - India" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 text-xs mb-3", children: "If you're in distress, please reach out for help. You're not alone." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-200 dark:border-red-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-red-800 dark:text-red-200 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Emergency:" }),
            " 112"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "AASRA:" }),
            " 91-22-27546669"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sneha:" }),
            " 044-24640050"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Vandrevala Foundation:" }),
            " 1860-2662-345"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "iCall:" }),
            " 9152987821"
          ] })
        ] })
      ] }) })
    ] })
  ] }), "renderPrivacySection");
  const renderAboutSection = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white mb-3", children: "About MindEase" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4", children: "MindEase is your companion for mental wellness, designed to help you manage stress, anxiety, and emotions through guided meditations, AI support, and mindful practices." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: { rotate: [0, 5, -5, 0] },
            transition: { duration: 4, repeat: Infinity },
            className: "text-3xl mb-2",
            children: "🌱"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Version 1.0.0 • Made with love for your wellbeing" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white mb-3", children: "Support & Feedback" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            whileHover: { scale: 1.01 },
            whileTap: { scale: 0.99 },
            className: "w-full p-3 text-left bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-800 dark:text-white text-sm", children: "FAQ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Common questions and answers" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            whileHover: { scale: 1.01 },
            whileTap: { scale: 0.99 },
            className: "w-full p-3 text-left bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-800 dark:text-white text-sm", children: "Terms & Conditions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Privacy policy and terms of use" })
            ]
          }
        )
      ] })
    ] }),
    !(user == null ? void 0 : user.isGuest) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white mb-3", children: "Account Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          whileHover: { scale: 1.01 },
          whileTap: { scale: 0.99 },
          onClick: handleLogout,
          className: "w-full p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center space-x-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Sign Out" })
          ]
        }
      )
    ] })
  ] }), "renderAboutSection");
  const renderSection = /* @__PURE__ */ __name(() => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "appearance":
        return renderAppearanceSection();
      case "notifications":
        return renderNotificationsSection();
      case "privacy":
        return renderPrivacySection();
      case "about":
        return renderAboutSection();
      default:
        return renderProfileSection();
    }
  }, "renderSection");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-mint-50 via-sky-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(10)].map((_2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute rounded-full opacity-10",
        style: {
          width: `${60 + Math.random() * 120}px`,
          height: `${60 + Math.random() * 120}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `linear-gradient(45deg, ${["#a7f3d0", "#bae6fd", "#e9d5ff", "#faf2e1"][Math.floor(Math.random() * 4)]}, transparent)`
        },
        animate: {
          x: [0, 30, -30, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 180, 360]
        },
        transition: {
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5
        }
      },
      i2
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pt-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold gradient-text mb-2", children: "Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm", children: "Personalize your MindEase experience" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card p-2 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1", children: sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          onClick: () => setActiveSection(section.id),
          className: `p-3 rounded-xl transition-all ${activeSection === section.id ? "bg-gradient-to-r from-mint-500 to-sky-500 text-white shadow-lg" : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(section.icon, { className: "w-5 h-5 mx-auto mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium", children: section.name })
          ]
        },
        section.id
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          className: "pb-24",
          children: renderSection()
        },
        activeSection
      )
    ] })
  ] });
}, "Settings");
const Navigation = /* @__PURE__ */ __name(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/meditate", icon: TreePine, label: "Meditate" },
    { path: "/chat", icon: MessageCircle, label: "ChatBot" },
    { path: "/community", icon: Users, label: "Community" },
    { path: "/settings", icon: Settings$1, label: "Settings" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/20 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-around", children: navItems.map((item) => {
    const isActive = location.pathname === item.path;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
        onClick: () => navigate(item.path),
        className: `flex flex-col items-center py-2 px-3 rounded-2xl transition-all ${isActive ? "text-mint-600 dark:text-mint-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: isActive ? {
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              } : {},
              transition: { duration: 0.5 },
              className: `p-2 rounded-xl mb-1 ${isActive ? "bg-mint-100 dark:bg-mint-900/30" : ""}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: item.label }),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              layoutId: "activeTab",
              className: "absolute -top-1 w-1 h-1 bg-mint-500 rounded-full"
            }
          )
        ]
      },
      item.path
    );
  }) }) }) });
}, "Navigation");
function AppContent() {
  const { user, isLoading } = useAuth();
  const [showSplash, setShowSplash] = reactExports.useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3e3);
    return () => clearTimeout(timer);
  }, []);
  reactExports.useEffect(() => {
    if (user) {
      const onboardingComplete = localStorage.getItem(`onboarding_${user.id}`);
      setHasCompletedOnboarding(!!onboardingComplete);
    }
  }, [user]);
  if (isLoading || showSplash) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SplashScreen, {});
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginScreen, {});
  }
  if (!hasCompletedOnboarding) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(OnboardingFlow, { onComplete: () => setHasCompletedOnboarding(true) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BrowserRouter, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/meditate", element: /* @__PURE__ */ jsxRuntimeExports.jsx(MeditationHub, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/chat", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ChatBot, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/community", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Community, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/settings", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, {})
  ] }) });
}
__name(AppContent, "AppContent");
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "App", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppContent, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Fe,
      {
        position: "top-center",
        toastOptions: {
          duration: 3e3,
          style: {
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            color: "#374151"
          }
        }
      }
    )
  ] }) }) }) });
}
__name(App, "App");
const index = "";
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React$1.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
