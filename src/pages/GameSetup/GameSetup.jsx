import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaPython, FaJs, FaPhp } from 'react-icons/fa';
import { Shield, Swords, Crown, Sparkles, Zap, Star } from 'lucide-react';

// --- Datos de subtemas ampliados ---
const subtemasPorDificultad = {
    python: {
        facil: ["Variables y Tipos de Datos", "Operadores Básicos", "Listas", "Condicionales Simples", "Input/Output"],
        medio: ["Funciones y Alcance", "Bucles For y While", "Diccionarios", "Manejo de Archivos", "Módulos"],
        dificil: ["Programación Orientada a Objetos", "Manejo de Errores", "Comprensión de Listas", "Decoradores", "Generators"]
    },
    javascript: {
        facil: ["Declaración de Variables (var, let, const)", "Tipos de Datos Primitivos", "Arrays", "Funciones Básicas", "Condicionales"],
        medio: ["Objetos y Propiedades", "DOM Básico", "Funciones Flecha", "Event Listeners", "JSON"],
        dificil: ["Asincronía (Promises, async/await)", "Closures", "Prototipos", "ES6+ Features", "Modules"]
    },
    php: {
        facil: ["Sintaxis Básica y Variables", "Estructuras de Control (if, else)", "Arrays Simples", "Funciones Básicas", "Formularios"],
        medio: ["Funciones", "Formularios (GET y POST)", "Sesiones Básicas", "Cookies", "Include/Require"],
        dificil: ["Clases y Objetos (POO)", "Conexión a Base de Datos (PDO)", "APIs REST", "Namespaces", "Composer"]
    }
};

// --- Opciones mejoradas con descripciones ---
const languageOptions = [
    {
        id: 'python',
        name: 'Python',
        icon: <FaPython size={50} />,
        description: "El lenguaje de la serpiente sabia"
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        icon: <FaJs size={50} />,
        description: "El hechizo del navegador"
    },
    {
        id: 'php',
        name: 'PHP',
        icon: <FaPhp size={50} />,
        description: "La magia del servidor"
    },
];

const difficultyOptions = [
    {
        id: 'facil',
        name: 'Aprendiz',
        icon: <Shield size={40} />,
        description: "Para nuevos aventureros",
        color: "#4ade80"
    },
    {
        id: 'medio',
        name: 'Guerrero',
        icon: <Swords size={40} />,
        description: "Para valientes experimentados",
        color: "#f59e0b"
    },
    {
        id: 'dificil',
        name: 'Maestro',
        icon: <Crown size={40} />,
        description: "Solo para los más audaces",
        color: "#ef4444"
    },
];

// --- Animaciones mejoradas ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const cardHoverVariants = {
    hover: {
        scale: 1.05,
        y: -10,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    },
    tap: { scale: 0.95 }
};

const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8
        }
    }
};

const GameSetup = () => {
    const [step, setStep] = useState(1);
    const [language, setLanguage] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [subtopic, setSubtopic] = useState('');
    const [availableSubtopics, setAvailableSubtopics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Efecto para gestionar la clase del body y evitar doble scroll
    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    const playSound = (soundType) => {
        console.log(`🔊 Playing sound: ${soundType}`);
    };

    useEffect(() => {
        if (language && difficulty) {
            setAvailableSubtopics(subtemasPorDificultad[language][difficulty]);
            setSubtopic('');
        }
    }, [language, difficulty]);

    const handleSelectLanguage = (lang) => {
        playSound('select');
        setLanguage(lang);
        setTimeout(() => setStep(2), 300);
    };

    const handleSelectDifficulty = (diff) => {
        playSound('select');
        setDifficulty(diff);
        setTimeout(() => setStep(3), 300);
    };

    const handleSelectSubtopic = (topic) => {
        playSound('select');
        setSubtopic(topic);
    };

    const handleStartGame = () => {
        if (!language || !difficulty || !subtopic) {
            alert("¡Oh valiente aventurero! Debes completar tu preparación antes de enfrentar el desafío.");
            return;
        }

        playSound('start_game');
        setIsLoading(true);

        setTimeout(() => {
            const gameConfig = { language, difficulty, subtopic };
            console.log('Game config:', gameConfig);
            window.location.href = '/Juego/index.html';
        }, 2000);
    };

    const handleGoBack = (targetStep) => {
        playSound('back');
        setStep(targetStep);
    };

    const getSelectedLanguageIcon = () => {
        const selected = languageOptions.find(opt => opt.id === language);
        return selected ? selected.icon : null;
    };

    const getSelectedDifficultyIcon = () => {
        const selected = difficultyOptions.find(opt => opt.id === difficulty);
        return selected ? selected.icon : null;
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-8 pt-28 text-center bg-[radial-gradient(ellipse_at_top,rgba(139,69,19,0.3)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,rgba(43,29,15,0.4)_0%,transparent_50%),linear-gradient(135deg,#1a1a1a_0%,#2d1810_100%)] relative">
            <motion.h1
                className="font-['Uncial_Antiqua',_cursive] text-6xl text-amber-400 [text-shadow:0_0_10px_rgba(255,191,0,0.6),_2px_2px_4px_rgba(0,0,0,0.8),_4px_4px_8px_rgba(0,0,0,0.5)] mb-8 tracking-widest animate-pulse-glow z-10"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
            >
                <Sparkles className="inline mr-4" size={60} />
                Prepara tu Destino
                <Sparkles className="inline ml-4" size={60} />
            </motion.h1>

            <motion.div
                className="flex items-center justify-center mb-8 space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {[1, 2, 3].map((num) => (
                    <div
                        key={num}
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${step >= num
                                ? 'bg-yellow-400 border-yellow-400 shadow-lg shadow-yellow-400/50'
                                : 'bg-transparent border-yellow-600'
                            }`}
                    />
                ))}
            </motion.div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-5xl flex flex-col items-center z-20">
                        <motion.h2 className="font-['Cinzel',_serif] text-4xl font-semibold text-amber-400 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] mb-10 relative inline-block after:content-[''] after:absolute after:-bottom-2.5 after:left-1/2 after:-translate-x-1/2 after:w-3/5 after:h-1 after:bg-gradient-to-r after:from-transparent after:via-amber-400 after:to-transparent after:animate-underline-glow" variants={itemVariants}>
                            <Star className="inline mr-3" size={35} />
                            Elige tu Gremio de Magia
                            <Star className="inline ml-3" size={35} />
                        </motion.h2>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 w-full mb-8">
                            {languageOptions.map((opt) => (
                                <motion.button
                                    key={opt.id}
                                    variants={itemVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => handleSelectLanguage(opt.id)}
                                    className="relative bg-gradient-to-br from-[rgba(43,29,15,0.9)] to-[rgba(139,69,19,0.7)] border-2 border-amber-700 rounded-2xl p-8 flex flex-col items-center justify-center text-amber-50 font-['Cinzel',_serif] font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:border-amber-400 hover:text-amber-400 overflow-hidden group"
                                >
                                    <motion.div variants={cardHoverVariants} className="flex flex-col items-center gap-4">
                                        <div className="transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:drop-shadow-lg">{opt.icon}</div>
                                        <span className="font-bold text-xl">{opt.name}</span>
                                        <span className="text-sm opacity-80">{opt.description}</span>
                                    </motion.div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-5xl flex flex-col items-center z-20">
                        <motion.div className="flex items-center justify-center mb-6" variants={itemVariants}>
                            {getSelectedLanguageIcon()}
                            <Zap className="mx-4" size={30} />
                            <span className="text-2xl font-bold text-yellow-400">
                                {languageOptions.find(opt => opt.id === language)?.name}
                            </span>
                        </motion.div>
                        <motion.h2 className="font-['Cinzel',_serif] text-4xl font-semibold text-amber-400 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] mb-10 relative inline-block after:content-[''] after:absolute after:-bottom-2.5 after:left-1/2 after:-translate-x-1/2 after:w-3/5 after:h-1 after:bg-gradient-to-r after:from-transparent after:via-amber-400 after:to-transparent after:animate-underline-glow" variants={itemVariants}>
                            <Swords className="inline mr-3" size={35} />
                            Selecciona tu Rango
                            <Swords className="inline ml-3" size={35} />
                        </motion.h2>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 w-full mb-8">
                            {difficultyOptions.map((opt) => (
                                <motion.button
                                    key={opt.id}
                                    variants={itemVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => handleSelectDifficulty(opt.id)}
                                    className="relative bg-gradient-to-br from-[rgba(43,29,15,0.9)] to-[rgba(139,69,19,0.7)] border-2 border-amber-700 rounded-2xl p-8 flex flex-col items-center justify-center text-amber-50 font-['Cinzel',_serif] font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:border-amber-400 hover:text-amber-400 overflow-hidden group"
                                >
                                    <motion.div variants={cardHoverVariants} className="flex flex-col items-center gap-4">
                                        <div className="transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:drop-shadow-lg">{opt.icon}</div>
                                        <span className="font-bold text-xl">{opt.name}</span>
                                        <span className="text-sm opacity-80">{opt.description}</span>
                                    </motion.div>
                                </motion.button>
                            ))}
                        </div>
                        <motion.button onClick={() => handleGoBack(1)} className="bg-transparent border-2 border-transparent text-amber-700 text-lg font-['Cinzel',_serif] cursor-pointer p-3 rounded-full transition-all duration-300 hover:text-amber-50 hover:border-amber-800 hover:bg-amber-800/20" variants={itemVariants} whileHover={{ x: -5 }}>
                            ← Cambiar Gremio
                        </motion.button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full max-w-3xl flex flex-col items-center z-20">
                        <motion.div className="flex items-center justify-center mb-6 space-x-4" variants={itemVariants}>
                            {getSelectedLanguageIcon()}
                            <Zap size={25} />
                            {getSelectedDifficultyIcon()}
                            <span className="text-lg font-bold text-yellow-400">
                                {languageOptions.find(opt => opt.id === language)?.name} - {difficultyOptions.find(opt => opt.id === difficulty)?.name}
                            </span>
                        </motion.div>
                        <motion.h2 className="font-['Cinzel',_serif] text-4xl font-semibold text-amber-400 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] mb-10 relative inline-block after:content-[''] after:absolute after:-bottom-2.5 after:left-1/2 after:-translate-x-1/2 after:w-3/5 after:h-1 after:bg-gradient-to-r after:from-transparent after:via-amber-400 after:to-transparent after:animate-underline-glow" variants={itemVariants}>
                            <Crown className="inline mr-3" size={35} />
                            ¿Qué Hechizo Dominarás?
                            <Crown className="inline ml-3" size={35} />
                        </motion.h2>
                        <motion.div className="grid grid-cols-1 gap-4 w-full max-w-2xl mb-10 max-h-[40vh] overflow-y-auto px-4" variants={containerVariants}>
                            {availableSubtopics.map((tema) => (
                                <motion.button
                                    key={tema}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, x: 10, transition: { type: "spring", stiffness: 300 } }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelectSubtopic(tema)}
                                    className={`relative bg-gradient-to-r from-black/40 to-amber-900/60 border-2 border-amber-800 p-5 rounded-lg text-amber-50 font-['MedievalSharp',_cursive] text-lg cursor-pointer text-center transition-all duration-300 ease-in-out backdrop-blur-sm overflow-hidden hover:bg-gradient-to-r hover:from-amber-800 hover:to-amber-600 hover:text-amber-300 hover:border-amber-400 ${subtopic === tema ? 'bg-gradient-to-r from-amber-400 to-amber-600 !text-black !border-amber-50 font-bold shadow-lg' : ''}`}
                                >
                                    {tema}
                                    {subtopic === tema && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl animate-bounce">⚔️</span>}
                                </motion.button>
                            ))}
                        </motion.div>
                        <motion.div className="flex justify-between items-center w-full max-w-2xl mt-8 flex-col-reverse sm:flex-row gap-6" variants={itemVariants}>
                            <motion.button onClick={() => handleGoBack(2)} className="bg-transparent border-2 border-transparent text-amber-700 text-lg font-['Cinzel',_serif] cursor-pointer p-3 rounded-full transition-all duration-300 hover:text-amber-50 hover:border-amber-800 hover:bg-amber-800/20" whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
                                ← Cambiar Rango
                            </motion.button>
                            <motion.button
                                onClick={handleStartGame}
                                className="relative bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 border-2 border-amber-50 text-white px-12 py-6 text-2xl font-bold font-['Cinzel',_serif] rounded-full cursor-pointer shadow-lg transition-all duration-300 uppercase tracking-widest overflow-hidden disabled:bg-gray-600 disabled:border-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={!subtopic}
                                whileHover={subtopic ? {
                                    scale: 1.05,
                                    boxShadow: "0px 10px 30px rgba(255, 191, 0, 0.5)",
                                    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)"
                                } : {}}
                                whileTap={subtopic ? { scale: 0.98 } : {}}
                            >
                                <span className="flex items-center justify-center">
                                    <Sparkles className="mr-2" size={24} />
                                    ¡A la Batalla!
                                    <Sparkles className="ml-2" size={24} />
                                </span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    >
                        <motion.div
                            className="text-center"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <motion.h3
                                className="text-2xl font-bold text-yellow-400 mb-2"
                                animate={{
                                    textShadow: [
                                        "0 0 10px rgba(255, 191, 0, 0.5)",
                                        "0 0 20px rgba(255, 191, 0, 0.8)",
                                        "0 0 10px rgba(255, 191, 0, 0.5)"
                                    ]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                Forjando tu Destino...
                            </motion.h3>
                            <motion.p
                                className="text-lg text-gray-300"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                El campo de batalla te espera.
                            </motion.p>
                            <motion.div
                                className="w-64 h-2 bg-gray-700 rounded-full mt-6 overflow-hidden"
                            >
                                <motion.div
                                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.8, ease: "easeInOut" }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GameSetup;