import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPython, FaJs, FaPhp } from 'react-icons/fa';
import { Shield, Swords, Crown, Sparkles, Zap, Star } from 'lucide-react';
import './GameSetup.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import slugify from "slugify"; 
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL;

// --- Animaciones (Estas no cambian) ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }, exit: { opacity: 0, transition: { duration: 0.3 } }};
const itemVariants = { hidden: { opacity: 0, y: 30, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }};
const cardHoverVariants = { hover: { scale: 1.05, y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }, tap: { scale: 0.95 }};
const titleVariants = { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 } }};

const GameSetup = () => {
    const { t } = useTranslation();
    const { profile, loading: isLoadingAuth, token } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [language, setLanguage] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [subtopic, setSubtopic] = useState('');
    const [availableSubtopics, setAvailableSubtopics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasCourse, setHasCourse] = useState(false);
    const [loadingCourse, setLoadingCourse] = useState(true);

    const languageOptions = useMemo(() => [
        { id: 'python', name: t('game_setup.languages.python'), icon: <FaPython size={30} />, description: t('game_setup.language_descriptions.python') },
        { id: 'javascript', name: t('game_setup.languages.javascript'), icon: <FaJs size={50} />, description: t('game_setup.language_descriptions.javascript') },
        { id: 'php', name: t('game_setup.languages.php'), icon: <FaPhp size={50} />, description: t('game_setup.language_descriptions.php') },
    ], [t]);

    const difficultyOptions = useMemo(() => [
        { id: 'facil', name: t('game_setup.difficulties.facil'), icon: <Shield size={45} />, description: t('game_setup.difficulty_descriptions.facil'), color: "#4ade80" },
        { id: 'medio', name: t('game_setup.difficulties.medio'), icon: <Swords size={45} />, description: t('game_setup.difficulty_descriptions.medio'), color: "#f59e0b" },
        { id: 'dificil', name: t('game_setup.difficulties.dificil'), icon: <Crown size={45} />, description: t('game_setup.difficulty_descriptions.dificil'), color: "#ef4444" },
    ], [t]);

    useEffect(() => {
        document.body.classList.add('game-setup-active');
        return () => document.body.classList.remove('game-setup-active');
    }, []);

    useEffect(() => {
        const checkUserCourse = async () => {
            if (!profile?.username) { setLoadingCourse(false); return; }
            try {
                const res = await fetch(`${API_URL}/auth_juego/check-course/${profile.username}`);
                const data = await res.json();
                setHasCourse(data.existe === 1);
            } catch (err) {
                console.error(t('game_setup.alerts.course_check_error'), err);
                setHasCourse(false);
            } finally {
                setLoadingCourse(false);
            }
        };
        checkUserCourse();
    }, [profile, t]);

    const handleNewGame = () => setStep(1);
    const handleContinue = () => { window.location.href = '/Juego/index.html'; };
    const playSound = (soundType) => console.log(`🔊 Playing sound: ${soundType}`);

    useEffect(() => {
        if (language && difficulty) {
            const subtopicsKey = `game_setup.subtopics.${language}_${difficulty}`;
            setAvailableSubtopics(t(subtopicsKey, { returnObjects: true }));
            setSubtopic('');
        }
    }, [language, difficulty, t]);

    const handleSelectLanguage = (lang) => {
        playSound('select');
        setLanguage(lang);
        setDifficulty('');
        setSubtopic('');
        setTimeout(() => setStep(2), 300);
    };

    const handleSelectDifficulty = (diff) => {
        playSound('select');
        setDifficulty(diff);
        setSubtopic('');
        setTimeout(() => setStep(3), 300);
    };

    const handleSelectSubtopic = (topic) => {
        playSound('select');
        setSubtopic(topic);
    };

    // --- CÓDIGO CORREGIDO Y SIMPLIFICADO ---
    const handleStartGame = async () => {
        if (!language || !difficulty || !subtopic) {
            alert(t('game_setup.alerts.complete_preparation'));
            return;
        }
        if (!profile) {
            alert(t('game_setup.alerts.wait_for_hero'));
            return;
        }
        playSound('start_game');
        setIsLoading(true);
        
        // Prepara el payload para TU backend principal
        const payload = {
            tema: language,
            dificultad: difficulty,
            curso: slugify(subtopic, { lower: true, strict: true })
        };
    
        try {
            // Llama ÚNICAMENTE a tu backend principal
            console.log("Iniciando sesión de juego y pidiendo datos a la IA a través del backend...");
            const sessionResponse = await fetch(`${API_URL}/auth_juego/start-game-session`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });
    
            // Verifica que tu backend haya completado la tarea
            const sessionData = await sessionResponse.json();
            if (!sessionResponse.ok) {
                // Este error ahora vendrá de tu backend principal
                throw new Error(`Error al iniciar sesión: ${JSON.stringify(sessionData.detail || sessionData.message)}`);
            }
            
            console.log("Backend ha confirmado la creación de la sesión y guardado de archivos.");
    
            // Como el backend ya guardó todo, simplemente redirige al juego.
            window.location.href = '/Juego/index.html';
    
        } catch (error) {
            alert(t('game_setup.alerts.start_game_error_generic', { error: error.message }));
            setIsLoading(false);
        }
    };
    // --- FIN DEL CÓDIGO CORREGIDO ---

    const handleGoBack = (targetStep) => {
        playSound('back');
        if (targetStep === 1) {
            setLanguage(''); setDifficulty(''); setSubtopic('');
        } else if (targetStep === 2) {
            setDifficulty(''); setSubtopic('');
        }
        setStep(targetStep);
    };

    const getSelectedLanguageIcon = () => languageOptions.find(opt => opt.id === language)?.icon || null;
    const getSelectedDifficultyIcon = () => difficultyOptions.find(opt => opt.id === difficulty)?.icon || null;

    if (isLoadingAuth) {
        return <div className="loading-screen">{t('game_setup.loading_hero')}</div>;
    }

    return (
        <div className="game-setup-container">
            <motion.h1 className="main-title" variants={titleVariants} initial="hidden" animate="visible">
                <Sparkles className="inline mr-4" size={60} />
                {t('game_setup.main_title')}
                <Sparkles className="inline ml-4" size={60} />
            </motion.h1>
            
            <AnimatePresence mode="wait">
                {step === 0 && !loadingCourse && (
                    <motion.div key="menu" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="setup-section text-center">
                        <motion.h2 className="section-title mb-6" variants={itemVariants}>
                            {profile?.username ? t('game_setup.welcome_message', { user: profile.username }) : t('game_setup.welcome_default')}
                        </motion.h2>
                        <div className="flex flex-col items-center gap-4">
                            <motion.button variants={itemVariants} whileHover="hover" whileTap="tap" onClick={handleNewGame} className="start-game-button w-64">
                                {t('game_setup.new_game_button')}
                            </motion.button>
                            {hasCourse && (
                                <motion.button variants={itemVariants} whileHover="hover" whileTap="tap" onClick={handleContinue} className="back-button w-64">
                                    {t('game_setup.continue_button')}
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <motion.div className="flex items-center justify-center mb-8 space-x-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                {[1, 2, 3].map((num) => (
                    <div key={num} className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${step >= num ? 'bg-yellow-400 border-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-transparent border-yellow-600'}`}/>
                ))}
            </motion.div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                     <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="setup-section">
                        <motion.h2 className="section-title" variants={itemVariants}>
                            <Star className="inline mr-3" size={35} />
                            {t('game_setup.step1_title')}
                            <Star className="inline ml-3" size={35} />
                        </motion.h2>
                        <div className="options-grid">
                            {languageOptions.map((opt, index) => (
                                <motion.button key={opt.id} variants={itemVariants} whileHover="hover" whileTap="tap" onClick={() => handleSelectLanguage(opt.id)} className="option-card language-card group" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <motion.div variants={cardHoverVariants} className="flex flex-col items-center">
                                        <div className="mb-4">{opt.icon}</div>
                                        <span className="font-bold text-xl mb-2">{opt.name}</span>
                                        <span className="text-sm opacity-80 text-center">{opt.description}</span>
                                    </motion.div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="setup-section">
                        <motion.div className="flex items-center justify-center mb-6" variants={itemVariants}>
                            <div className="flex flex-col items-center gap-2">
                                <div className="mb-2">{getSelectedLanguageIcon()}</div>
                                <span className="text-xl font-bold text-yellow-400">{languageOptions.find(opt => opt.id === language)?.name}</span>
                            </div>
                        </motion.div>
                        <motion.h2 className="section-title" variants={itemVariants}>
                            <Swords className="inline mr-3" size={35} />
                            {t('game_setup.step2_title')}
                            <Swords className="inline ml-3" size={35} />
                        </motion.h2>
                        <div className="options-grid">
                                {difficultyOptions.map((opt, index) => (
                                    <motion.button key={opt.id} variants={itemVariants} whileHover="hover" whileTap="tap" onClick={() => handleSelectDifficulty(opt.id)} className="option-card group" style={{ animationDelay: `${index * 0.1}s`, '--hover-color': opt.color }}>
                                        <motion.div variants={cardHoverVariants} className="flex flex-col items-center">
                                            <div className="mb-4">{opt.icon}</div>
                                            <span className="font-bold text-xl mb-2">{opt.name}</span>
                                            <span className="text-sm opacity-80 text-center">{opt.description}</span>
                                        </motion.div>
                                    </motion.button>
                                ))}
                        </div>
                        <motion.button onClick={() => handleGoBack(1)} className="back-button mt-4" variants={itemVariants} whileHover={{ x: -5 }}>
                            {t('game_setup.change_guild_button')}
                        </motion.button>
                    </motion.div>
                )}
                {step === 3 && (
                     <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="setup-section">
                        <motion.div className="flex items-center justify-center mb-6 space-x-6" variants={itemVariants}>
                            <div className="flex flex-col items-center gap-2">
                                <div className="mb-1">{getSelectedLanguageIcon()}</div>
                                <span className="text-sm font-semibold text-yellow-400">{languageOptions.find(opt => opt.id === language)?.name}</span>
                            </div>
                            <Zap size={30} className="text-yellow-400" />
                            <div className="flex flex-col items-center gap-2">
                                <div className="mb-1">{getSelectedDifficultyIcon()}</div>
                                <span className="text-sm font-semibold text-yellow-400">{difficultyOptions.find(opt => opt.id === difficulty)?.name}</span>
                            </div>
                        </motion.div>
                        <motion.h2 className="section-title" variants={itemVariants}>
                            <Crown className="inline mr-3" size={35} />
                            {t('game_setup.step3_title')}
                            <Crown className="inline ml-3" size={35} />
                        </motion.h2>
                        <motion.div className="subtopic-grid" variants={containerVariants}>
                            {availableSubtopics.map((tema, index) => (
                                <motion.button key={tema} variants={itemVariants} whileHover={{ scale: 1.02, x: 10, transition: { type: "spring", stiffness: 300 } }} whileTap={{ scale: 0.98 }} onClick={() => handleSelectSubtopic(tema)} className={`subtopic-card ${subtopic === tema ? 'selected' : ''}`} style={{ animationDelay: `${index * 0.05}s` }}>
                                    {tema}
                                </motion.button>
                            ))}
                        </motion.div>
                        <motion.div className="navigation-buttons" variants={itemVariants}>
                            <motion.button onClick={() => handleGoBack(2)} className="back-button" whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
                                {t('game_setup.change_rank_button')}
                            </motion.button>
                            <motion.button onClick={handleStartGame} className="start-game-button" disabled={!subtopic} whileHover={subtopic ? { scale: 1.05, boxShadow: "0px 10px 30px rgba(255, 191, 0, 0.5)", textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)" } : {}} whileTap={subtopic ? { scale: 0.98 } : {}}>
                                <span className="flex items-center justify-center">
                                    <Sparkles className="mr-2" size={24} />
                                    {t('game_setup.start_battle_button')}
                                    <Sparkles className="ml-2" size={24} />
                                </span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

             <AnimatePresence>
                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                        <motion.div className="text-center" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                            <motion.h3 className="text-2xl font-bold text-yellow-400 mb-2" animate={{ textShadow: ["0 0 10px rgba(255, 191, 0, 0.5)", "0 0 20px rgba(255, 191, 0, 0.8)", "0 0 10px rgba(255, 191, 0, 0.5)"] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                {t('game_setup.loading_destiny')}
                            </motion.h3>
                            <motion.p className="text-lg text-gray-300" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                                {t('game_setup.loading_battlefield')}
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
