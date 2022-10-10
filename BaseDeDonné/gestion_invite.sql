-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2022 at 12:59 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestion_invite`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invitation`
--

CREATE TABLE `invitation` (
  `Id` bigint(20) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `DateEntre` datetime NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Commentaire` longtext DEFAULT NULL,
  `Type_Invitation` varchar(50) NOT NULL,
  `Civilite` enum('Mr','Mme','Mlle') NOT NULL,
  `Entreprise` varchar(200) DEFAULT NULL,
  `Poste` varchar(200) DEFAULT NULL,
  `Site` enum('Tit Melil','Sidi Hajjaj') NOT NULL,
  `ToUser_Id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invitation`
--

INSERT INTO `invitation` (`Id`, `Nom`, `Prenom`, `DateEntre`, `Email`, `Commentaire`, `Type_Invitation`, `Civilite`, `Entreprise`, `Poste`, `Site`, `ToUser_Id`, `created_at`, `updated_at`) VALUES
(1, 'Hamid', 'Hamidi', '2022-09-29 10:13:32', 'ghvcghvgh@fffff.com', 'bhtgrfgf ngrbtrhrty', 'Visite', 'Mr', 'Hamidi & Co', 'Hamideur', 'Tit Melil', 1, '2022-09-27 09:13:32', '2022-09-27 09:13:32'),
(3, 'Hamid', 'Hamidi', '2022-09-29 11:06:03', 'ghvcghvgh@fffff.com', 'bhtgrfgf ngrbtrhrty', 'Visite', 'Mr', 'Hamidi & Co', 'Hamideur', 'Tit Melil', 1, '2022-09-28 10:06:03', '2022-09-28 10:06:03'),
(5, 'Hamid', 'Hamidi', '2022-10-09 14:05:24', 'ghvcghvgh@fffff.com', 'bhtgrfgf ngrbtrhrty', 'Visite', 'Mlle', 'Hamidi & Co', 'Hamideur', 'Sidi Hajjaj', 1, '2022-09-28 13:05:24', '2022-09-28 13:05:24'),
(13, 'Sahimi', 'Taoufik', '2022-10-02 12:30:00', 'T.sahimi@sinamgroup.com', 'dsfsdfdsfsdfsfdsdfdfsdf', 'Entretien Metier', 'Mr', 'Univers Acier', 'Dévéloppeur Full Stack', 'Tit Melil', 1, '2022-10-01 17:54:10', '2022-10-01 17:54:10');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(36, 'App\\Models\\User', 1, 'MehdiTouimy_Token', '9fe53cdabf09638d75d7a349636e4831b4846de04e55003b0e54f5d4a6656fd9', '[\"*\"]', '2022-10-01 19:06:36', NULL, '2022-10-01 16:53:50', '2022-10-01 19:06:36'),
(37, 'App\\Models\\User', 1, 'MehdiTouimy_Token', '3d73900d9e566ce4f7487157db2cb0293d8e4dace7cbcc193a88188f03567d6f', '[\"*\"]', '2022-10-01 17:38:44', NULL, '2022-10-01 17:09:47', '2022-10-01 17:38:44'),
(39, 'App\\Models\\User', 2, 'J415236525_Token', '0ad811315791f023c91c4aefccf5fe4f65c21920cf03270157a8d34b390cb31f', '[\"*\"]', '2022-10-09 09:57:49', NULL, '2022-10-09 00:24:02', '2022-10-09 09:57:49');

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `id` int(11) NOT NULL,
  `intituleSite` int(11) NOT NULL,
  `adresse` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `identifiant` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nom` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Prenom` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Civilite` enum('Mr','Mme','Mlle') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Role` enum('Admin','Securite') COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `identifiant`, `Email`, `Nom`, `Prenom`, `Civilite`, `Role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'MehdiTouimy', 'touimy1210@gmail.com', 'touimy', 'mehdi', 'Mr', 'Admin', NULL, 'YOUSSEF1998', NULL, '2022-09-15 11:09:24', '2022-09-14 23:00:00'),
(2, 'J415236525', 'yousseffarni98@gmail.com', 'FARNI', 'YOUSSEF', 'Mr', 'Admin', NULL, 'YOUSSEF1998', NULL, '2022-09-30 14:19:38', '2022-09-30 14:19:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `invitation`
--
ALTER TABLE `invitation`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `ToUserId` (`ToUser_Id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`Email`),
  ADD UNIQUE KEY `identifiant` (`identifiant`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invitation`
--
ALTER TABLE `invitation`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invitation`
--
ALTER TABLE `invitation`
  ADD CONSTRAINT `invitation_user` FOREIGN KEY (`ToUser_Id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
