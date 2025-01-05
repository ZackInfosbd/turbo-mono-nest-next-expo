-- CreateEnum
CREATE TYPE "SecurityEventType" AS ENUM ('LOGIN', 'LOGOUT', 'PASSWORD_CHANGE', 'MFA_ENABLED', 'MFA_DISABLED', 'LOGIN_FAILED', 'ACCOUNT_LOCKED');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('DESKTOP', 'MOBILE', 'TABLET', 'OTHER');

-- CreateEnum
CREATE TYPE "MfaMethod" AS ENUM ('NONE', 'TOTP', 'SMS', 'EMAIL');

-- CreateEnum
CREATE TYPE "PrivacyLevel" AS ENUM ('PUBLIC', 'FRIENDS', 'PRIVATE');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'CHF', 'JPY');

-- CreateEnum
CREATE TYPE "AuthProviderType" AS ENUM ('CREDENTIALS', 'GOOGLE', 'APPLE');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('PERSONAL', 'BUSINESS', 'BILLING', 'SHIPPING');

-- CreateEnum
CREATE TYPE "ProfileFileTypes" AS ENUM ('AVATAR', 'LOGO', 'BANNER', 'STORE_IMG');

-- CreateEnum
CREATE TYPE "UserFileTypes" AS ENUM ('KYC', 'IDENTITY', 'OTHER');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PRIVATE', 'PROFESSIONAL', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'PENDING', 'SUSPENDED', 'INACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateTable
CREATE TABLE "Admin" (
    "uid" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Credentials" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthProvider" (
    "id" TEXT NOT NULL,
    "type" "AuthProviderType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "type" "UserType" NOT NULL DEFAULT 'PRIVATE',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "socketId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "UserRolesAssignedByUsers" (
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleAssignedById" TEXT NOT NULL,
    "assignedRoleId" INTEGER NOT NULL,
    "roleAssignedToId" TEXT NOT NULL,

    CONSTRAINT "UserRolesAssignedByUsers_pkey" PRIMARY KEY ("assignedRoleId","roleAssignedToId")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "createdById" TEXT NOT NULL,
    "lastUpdatedById" TEXT,
    "deletedById" TEXT,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRolePermissions" (
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userRoleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "assignedById" TEXT NOT NULL,

    CONSTRAINT "UserRolePermissions_pkey" PRIMARY KEY ("permissionId","userRoleId")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "lastUpdatedById" TEXT,
    "deletedById" TEXT,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "pushNotifications" BOOLEAN NOT NULL DEFAULT true,
    "smsNotifications" BOOLEAN NOT NULL DEFAULT false,
    "profileVisibility" "PrivacyLevel" NOT NULL DEFAULT 'PUBLIC',
    "activityVisibility" "PrivacyLevel" NOT NULL DEFAULT 'PUBLIC',
    "requireMfaForPayments" BOOLEAN NOT NULL DEFAULT false,
    "loginNotifications" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_security" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "mfaMethod" "MfaMethod" NOT NULL DEFAULT 'NONE',
    "mfaSecret" TEXT,
    "backupCodes" TEXT[],
    "maxSessions" INTEGER NOT NULL DEFAULT 5,
    "passwordlessEnabled" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_security_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_logs" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "eventType" "SecurityEventType" NOT NULL,
    "eventData" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "location" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT,
    "deviceId" TEXT,
    "deviceType" "DeviceType",
    "deviceName" TEXT,
    "clientApp" TEXT,
    "clientVersion" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "location" JSONB,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invalidatedAt" TIMESTAMP(3),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "displayName" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "phone" TEXT,
    "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "company" TEXT,
    "position" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "Etag" TEXT NOT NULL,
    "Type" "UserFileTypes" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "UserFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileFiles" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "Etag" TEXT NOT NULL,
    "Type" "ProfileFileTypes" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ProfileFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "profileId" TEXT NOT NULL,
    "type" "AddressType" NOT NULL DEFAULT 'PERSONAL',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "street" TEXT NOT NULL,
    "streetNumber" TEXT,
    "apartment" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "contactName" TEXT,
    "contactPhone" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastUsedAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "uid" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_email_key" ON "Credentials"("email");

-- CreateIndex
CREATE INDEX "users_type_status_idx" ON "users"("type", "status");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_key" ON "UserRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_name_key" ON "Permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_userId_key" ON "user_preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_security_userId_key" ON "user_security"("userId");

-- CreateIndex
CREATE INDEX "security_logs_userId_idx" ON "security_logs"("userId");

-- CreateIndex
CREATE INDEX "security_logs_created_at_idx" ON "security_logs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refreshToken_key" ON "sessions"("refreshToken");

-- CreateIndex
CREATE INDEX "sessions_userId_isValid_idx" ON "sessions"("userId", "isValid");

-- CreateIndex
CREATE INDEX "sessions_token_idx" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_userId_key" ON "user_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_phone_key" ON "user_profiles"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "UserFiles_url_key" ON "UserFiles"("url");

-- CreateIndex
CREATE INDEX "UserFiles_userId_idx" ON "UserFiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileFiles_url_key" ON "ProfileFiles"("url");

-- CreateIndex
CREATE INDEX "ProfileFiles_profileId_idx" ON "ProfileFiles"("profileId");

-- CreateIndex
CREATE INDEX "addresses_profileId_idx" ON "addresses"("profileId");

-- CreateIndex
CREATE INDEX "addresses_countryCode_city_idx" ON "addresses"("countryCode", "city");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthProvider" ADD CONSTRAINT "AuthProvider_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRolesAssignedByUsers" ADD CONSTRAINT "UserRolesAssignedByUsers_roleAssignedById_fkey" FOREIGN KEY ("roleAssignedById") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRolesAssignedByUsers" ADD CONSTRAINT "UserRolesAssignedByUsers_assignedRoleId_fkey" FOREIGN KEY ("assignedRoleId") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRolesAssignedByUsers" ADD CONSTRAINT "UserRolesAssignedByUsers_roleAssignedToId_fkey" FOREIGN KEY ("roleAssignedToId") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "users"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "users"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRolePermissions" ADD CONSTRAINT "UserRolePermissions_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRolePermissions" ADD CONSTRAINT "UserRolePermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRolePermissions" ADD CONSTRAINT "UserRolePermissions_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "users"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "users"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_security" ADD CONSTRAINT "user_security_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_logs" ADD CONSTRAINT "security_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFiles" ADD CONSTRAINT "UserFiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileFiles" ADD CONSTRAINT "ProfileFiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_uid_fkey" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
