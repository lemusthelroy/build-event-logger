// Documentation: https://sdk.netlify.com
import { NetlifyIntegration, z } from "@netlify/sdk";

const buildConfigSchema = z.object({
  some_setting: z.string().optional(),
});

const integration = new NetlifyIntegration({ buildConfigSchema });

integration.onEnable(async (_, { teamId, siteId, client }) => {
  // Build event handlers are disabled by default, so we need to
  // enable them when the integration is enabled.

  siteId && (await client.enableBuildEventHandlers(siteId));

  return {
    statusCode: 200,
  };
});

integration.addBuildEventHandler(
  "onPreBuild",
  ({ buildConfig, constants, netlifyConfig }) => {
    console.log("buildConfig", buildConfig);
    console.log("onPreBuild", constants, netlifyConfig);
  },
);

export { integration };
