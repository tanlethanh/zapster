import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// tools/stacks/web.ts
import { NextjsSite } from "sst/constructs";

// tools/stacks/shared.ts
var hostedZone = "zenonian.com";
var baseDomain = "zapster.zenonian.com";

// tools/stacks/web.ts
var web = /* @__PURE__ */ __name(({ stack }) => {
  const web2 = new NextjsSite(stack, "web", {
    path: "web",
    customDomain: {
      domainName: baseDomain,
      hostedZone
    }
  });
  stack.addOutputs({
    url: web2.url,
    customDomain: web2.customDomainUrl
  });
}, "web");

// tools/stacks/api.ts
import { Api, Function } from "sst/constructs";
var api = /* @__PURE__ */ __name(({ stack }) => {
  const github = new Function(stack, "github", {
    handler: "github/index.handler",
    runtime: "nodejs20.x",
    environment: {
      GITHUB_WEBHOOKS_SECRET: process.env.GITHUB_WEBHOOKS_SECRET,
      DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
      GITHUB_DISCORD_CHANNEL_ID: process.env.GITHUB_DISCORD_CHANNEL_ID
    },
    timeout: "5 minutes"
  });
  const domainName = `api.${baseDomain}`;
  const api2 = new Api(stack, "api", {
    cors: {
      allowOrigins: ["*"],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST"]
    },
    routes: {
      "POST /github": {
        function: github
      }
    },
    customDomain: {
      hostedZone,
      domainName
    }
  });
  stack.addOutputs({
    url: api2.url,
    domain: api2.customDomainUrl
  });
}, "api");

// sst.config.ts
var sst_config_default = {
  config() {
    return {
      name: "zapster",
      region: "ap-south-1"
    };
  },
  stacks(app) {
    app.stack(web);
    app.stack(api);
  }
};
export {
  sst_config_default as default
};
