-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 28-Fev-2022 às 21:48
-- Versão do servidor: 5.7.31
-- versão do PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `blog`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `blogs`
--

DROP TABLE IF EXISTS `blogs`;
CREATE TABLE IF NOT EXISTS `blogs` (
  `id_artigo` int(255) NOT NULL AUTO_INCREMENT,
  `id_blogueiro_fk` int(255) NOT NULL,
  `nome_artigo` varchar(200) NOT NULL,
  `data` date NOT NULL,
  `url` varchar(200) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  PRIMARY KEY (`id_artigo`),
  KEY `id_fk` (`id_blogueiro_fk`)
) ENGINE=MyISAM AUTO_INCREMENT=98 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `blogs`
--

INSERT INTO `blogs` (`id_artigo`, `id_blogueiro_fk`, `nome_artigo`, `data`, `url`, `thumbnail`) VALUES
(91, 4, 'sem foto', '2022-02-01', 'sem-foto', 'thumbnail.png'),
(90, 4, 'a princesa da disney', '2022-02-01', 'a-princesa-da-disney', '5289882629214princesas-disney-1230956_widelg.jpg'),
(89, 4, 'a era do gelo', '2022-02-01', 'a-era-do-gelo', '31915177832hacker.jpg'),
(88, 4, 'testando thumbnail', '2022-01-31', 'testando-thumbnail', '7606730157425cabelo loiro.jpg'),
(93, 4, 'a vaca foi para o brejo', '2022-02-03', 'a-vaca-foi-para-o-brejo', '8525563969206vaca.jpg'),
(94, 4, 'blu blu', '2022-02-03', 'blu-blu', '6339978600319fundo-fotografico-em-tecido-madeira-rustica-2-60x1-50m-sublimacao.jpg'),
(96, 4, 'teste', '2022-02-08', 'teste', 'thumbnail.png');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cadastro_blogueiros`
--

DROP TABLE IF EXISTS `cadastro_blogueiros`;
CREATE TABLE IF NOT EXISTS `cadastro_blogueiros` (
  `id_blogueiro` int(255) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id_blogueiro`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cadastro_blogueiros`
--

INSERT INTO `cadastro_blogueiros` (`id_blogueiro`, `nome`, `email`, `senha`) VALUES
(4, 'Fulano', 'fulano@gmail.com', '$2y$10$eHklOAXhkmykNO5gNeVnUO/ZlezknvPX7h1IQoZAKDQvGCUVUldzK'),
(23, 'Hildeir', 'hildeir@hotmail.com', '$2y$10$SUzikgQWTf4DGU1UyYECZuMUUf8vVUToWRtZA/tsrYc5CKeoj6oJ.');

-- --------------------------------------------------------

--
-- Estrutura da tabela `imgpost`
--

DROP TABLE IF EXISTS `imgpost`;
CREATE TABLE IF NOT EXISTS `imgpost` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_blogueiro` int(11) DEFAULT NULL,
  `id_post` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_blogueiro` (`id_blogueiro`),
  KEY `id_post` (`id_post`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `imgpost`
--

INSERT INTO `imgpost` (`id`, `id_blogueiro`, `id_post`, `img`) VALUES
(71, 4, NULL, '4737590900631cabelo loiro.jpg'),
(69, 4, NULL, '8204131788714anatomia musculo homen.png'),
(68, 4, NULL, '5775969922265bebe-generica.jpg'),
(67, 4, 81, '4640405369240anatomia musculo homen.png'),
(66, 4, 81, '2545143761759anatomia musculo homen.png'),
(65, 4, 81, '74169616942334b2af62dfb26107bf20c66d48011b266.jpg'),
(62, 4, 79, '50275932655724b2af62dfb26107bf20c66d48011b266.jpg'),
(59, 4, 80, '8763629114404cabelo.jpg'),
(58, 4, 79, '2326834691097cabelo loiro.jpg'),
(57, 4, 79, '1632208244998cabelo.jpg'),
(72, 4, NULL, '7606730157425cabelo loiro.jpg'),
(73, 4, NULL, '31915177832hacker.jpg'),
(74, 4, NULL, '5289882629214princesas-disney-1230956_widelg.jpg'),
(75, 4, NULL, '8525563969206vaca.jpg'),
(76, 4, NULL, '6339978600319fundo-fotografico-em-tecido-madeira-rustica-2-60x1-50m-sublimacao.jpg'),
(77, 4, 82, '77184898939834b2af62dfb26107bf20c66d48011b266.jpg'),
(78, 4, 85, '1881436255514b2af62dfb26107bf20c66d48011b266.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_blogueiro_fk` int(255) NOT NULL,
  `titulo_pagina` text NOT NULL,
  `conteudo` mediumtext NOT NULL,
  `data` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_blogueiro_fk` (`id_blogueiro_fk`)
) ENGINE=MyISAM AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `posts`
--

INSERT INTO `posts` (`id`, `id_blogueiro_fk`, `titulo_pagina`, `conteudo`, `data`) VALUES
(86, 4, 'testando', 'titulo<div>asdadasdasd</div><div>asdasdasdasdsa</div>', '2022-02-08');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
