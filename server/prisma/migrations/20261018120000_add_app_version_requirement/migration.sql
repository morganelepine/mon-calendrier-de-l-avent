-- AppVersionRequirement: single row (id = 1) replacing the "min_required_version" key of AppConfig.
CREATE TABLE "public"."AppVersionRequirement" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "minSupportedVersion" TEXT NOT NULL,
    "latestVersion" TEXT NOT NULL,
    "updateMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppVersionRequirement_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "AppVersionRequirement_single_row" CHECK ("id" = 1),
    CONSTRAINT "AppVersionRequirement_version_format" CHECK (
        "minSupportedVersion" ~ '^\d+(\.\d+)*$'
        AND "latestVersion" ~ '^\d+(\.\d+)*$'
    )
);

-- Backfill from the current minimum version.
INSERT INTO "public"."AppVersionRequirement" ("minSupportedVersion", "latestVersion", "updatedAt")
SELECT "value", "value", CURRENT_TIMESTAMP
FROM "public"."AppConfig"
WHERE "key" = 'min_required_version';

DROP TABLE "public"."AppConfig";
