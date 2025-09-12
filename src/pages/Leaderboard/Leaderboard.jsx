import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next'; // Importar hook
import "./Leaderboard.css";

// Los datos de ejemplo se mantienen, ya que en un futuro vendrán de una API.
const leaderboardData = {
    principiante: [
        { id: 'b1', name: "NoviceHero", time: 180 },
        { id: 'b2', name: "RookieMage", time: 200 },
        { id: 'b3', name: "YoungKnight", time: 220 },
        { id: 'b4', name: "FirstTimer", time: 230 },
        { id: 'b5', name: "LearningWarrior", time: 240 },
    ],
    intermedio: [
        { id: 'i1', name: "ShadowKnight", time: 120 },
        { id: 'i2', name: "EternalMage", time: 135 },
        { id: 'i3', name: "CelestialWarrior", time: 145 },
        { id: 'i4', name: "FrostMage", time: 150 },
        { id: 'i5', name: "SilverPaladin", time: 155 },
    ],
    avanzado: [
        { id: 'a1', name: "DarkSorcerer", time: 95 },
        { id: 'a2', name: "PhantomAssassin", time: 105 },
        { id: 'a3', name: "NightmareHunter", time: 110 },
        { id: 'a4', name: "LegendaryArcher", time: 115 },
        { id: 'a5', name: "GrandWizard", time: 118 },
    ],
};

const Leaderboard = ({ title, players }) => {
    const { t } = useTranslation(); // Inicializar hook

    const getRankIcon = (index) => {
        if (index === 0) return '🏆';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return index + 1;
    };

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">{title}</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{t('leaderboard.player_header')}</th>
                        <th>{t('leaderboard.time_header')}</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={player.id} className="leaderboard-row">
                            <td className="rank-cell">{getRankIcon(index)}</td>
                            <td>{player.name}</td>
                            <td>{player.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Leaderboard.propTypes = {
    title: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
    })).isRequired,
};


const Leaderboards = () => {
    const { t } = useTranslation(); // Inicializar hook

    return (
        <div className="leaderboards-wrapper">
            <div className="leaderboards-container">
                <Leaderboard title={t('leaderboard.beginner_title')} players={leaderboardData.principiante} />
                <Leaderboard title={t('leaderboard.intermediate_title')} players={leaderboardData.intermedio} />
                <Leaderboard title={t('leaderboard.advanced_title')} players={leaderboardData.avanzado} />
            </div>
        </div>
    );
};

export default Leaderboards;