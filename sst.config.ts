/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "psswd",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {

    const hostedZone = process.env.HOSTED_ZONE || '';
    const kofiUser = process.env.KOFI_USER || '';

    const domainName = $app.stage === "production"
      ? `${process.env.DOMAIN_NAME}`
      : `${getStageSubDomain($app.stage)}.${process.env.DOMAIN_NAME}`;

    const web = new sst.aws.StaticSite("PsswdWeb", {
      domain: {
        name: domainName,
        dns: sst.aws.dns({
          zone: hostedZone
        })
      },
      build: {
        command: "yarn build",
        output: "dist"
      },
      environment: {
        KOFI_USER: kofiUser
      },
      dev: {
        command: "yarn astro:dev"
      }
    });
  },
});

function getStageSubDomain(stage: string): string {
  if (stage === 'development') return 'development';
  if (stage === 'testing') return 'testing';
  return `${stage}.development`;
}