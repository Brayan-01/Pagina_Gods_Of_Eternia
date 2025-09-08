import React from "react";
import PropTypes from "prop-types"; 

// --- Los datos y el componente Leaderboard se mantienen igual ---
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
    const getRankIcon = (index) => {
        if (index === 0) return '🏆';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return index + 1;
    };

    return (
        <div className="flex-1 min-w-[280px] max-w-sm my-5 p-5 bg-gradient-to-br from-[#9b7e20] to-[#7f2f86] text-gray-100 rounded-2xl shadow-lg text-center transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
            <h2 className="text-xl font-bold text-[#3d3511] uppercase mb-3">{title}</h2>
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-white/20">
                        <th className="p-2.5 border-b border-white/30 text-shadow">#</th>
                        <th className="p-2.5 border-b border-white/30 text-shadow">Jugador</th>
                        <th className="p-2.5 border-b border-white/30 text-shadow">Tiempo(s)</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={player.id} className="odd:bg-white/10 hover:bg-white/20 transition-colors duration-200 ease-out">
                            <td className="p-2.5 border-b border-white/30 font-bold text-base">{getRankIcon(index)}</td>
                            <td className="p-2.5 border-b border-white/30">{player.name}</td>
                            <td className="p-2.5 border-b border-white/30">{player.time}</td>
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


// --- Componente Principal Simplificado ---
const Leaderboards = () => {
    return (
        <div className="w-full flex justify-center p-5">
            <div className="flex justify-center gap-10 flex-nowrap lg:flex-wrap w-full max-w-6xl">
                <Leaderboard title="Principiante" players={leaderboardData.principiante} />
                <Leaderboard title="Intermedio" players={leaderboardData.intermedio} />
                <Leaderboard title="Avanzado" players={leaderboardData.avanzado} />
            </div>
        </div>
    );
};

export default Leaderboards;