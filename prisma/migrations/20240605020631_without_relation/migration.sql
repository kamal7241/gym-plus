-- CreateTable
CREATE TABLE `Coach` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Coach_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Secretary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Secretary_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trainee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parcode` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `subscriptionType` ENUM('PRIVATE', 'NOT_PRIVATE') NOT NULL,
    `subscriptionStatus` ENUM('ACTIVE', 'INACTIVE', 'PENDING') NOT NULL,
    `subscriptionDate` DATETIME(3) NOT NULL,
    `subscriptionStartDate` DATETIME(3) NOT NULL,
    `subscriptionMonths` INTEGER NOT NULL,
    `subscriptionClasses` INTEGER NOT NULL,
    `remainingClasses` INTEGER NOT NULL,
    `subscriptionEndDate` DATETIME(3) NOT NULL,
    `paid` INTEGER NOT NULL,
    `reminder` INTEGER NOT NULL,
    `trainingName` VARCHAR(191) NULL,
    `offerName` VARCHAR(191) NULL,
    `medicalProblem` VARCHAR(191) NULL,
    `surgeries` VARCHAR(191) NULL,
    `goal` VARCHAR(191) NULL,
    `sundayNote` VARCHAR(191) NULL,
    `mondayNote` VARCHAR(191) NULL,
    `tuesdayNote` VARCHAR(191) NULL,
    `wednesdayNote` VARCHAR(191) NULL,
    `thursdayNote` VARCHAR(191) NULL,
    `fridayNote` VARCHAR(191) NULL,
    `saturdayNote` VARCHAR(191) NULL,
    `generalNote` VARCHAR(191) NULL,

    UNIQUE INDEX `Trainee_parcode_key`(`parcode`),
    UNIQUE INDEX `Trainee_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InBody` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `traineeId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `length` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `shoulder` DOUBLE NOT NULL,
    `chest` DOUBLE NOT NULL,
    `belowChest` DOUBLE NOT NULL,
    `middle` DOUBLE NOT NULL,
    `stomach` DOUBLE NOT NULL,
    `buttocks` DOUBLE NOT NULL,
    `thigh` DOUBLE NOT NULL,
    `arm` DOUBLE NOT NULL,
    `BMI` DOUBLE NOT NULL,
    `currentSituation` VARCHAR(191) NOT NULL,
    `dailyWaterNeed` DOUBLE NOT NULL,
    `caloriesRequired` DOUBLE NOT NULL,
    `muscleWeight` DOUBLE NOT NULL,
    `fatMass` DOUBLE NOT NULL,
    `boneDensity` DOUBLE NOT NULL,
    `bellyFat` DOUBLE NOT NULL,
    `dietFile` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `traineeId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InBody` ADD CONSTRAINT `InBody_traineeId_fkey` FOREIGN KEY (`traineeId`) REFERENCES `Trainee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_traineeId_fkey` FOREIGN KEY (`traineeId`) REFERENCES `Trainee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
