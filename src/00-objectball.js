function gameObject() {
  return {
    home: {
      teamName: "Brooklyn Nets",
      colors: ["Black", "White"],
      players: {
        "Alan Anderson": {
          number: 0, shoe: 16, points: 22, rebounds: 12,
          assists: 12, steals: 3, blocks: 1, slamDunks: 1
        },
        "Reggie Evans": {
          number: 30, shoe: 14, points: 12, rebounds: 12,
          assists: 12, steals: 12, blocks: 12, slamDunks: 7
        },
        "Brook Lopez": {
          number: 11, shoe: 17, points: 17, rebounds: 19,
          assists: 10, steals: 3, blocks: 1, slamDunks: 15
        },
        "Mason Plumlee": {
          number: 1, shoe: 19, points: 26, rebounds: 12,
          assists: 6, steals: 3, blocks: 8, slamDunks: 5
        },
        "Jason Terry": {
          number: 31, shoe: 15, points: 19, rebounds: 2,
          assists: 2, steals: 4, blocks: 11, slamDunks: 1
        }
      }
    },
    away: {
      teamName: "Charlotte Hornets",
      colors: ["Turquoise", "Purple"],
      players: {
        "Jeff Adrien": {
          number: 4, shoe: 18, points: 10, rebounds: 1,
          assists: 1, steals: 2, blocks: 7, slamDunks: 2
        },
        "Bismak Biyombo": {
          number: 0, shoe: 16, points: 12, rebounds: 4,
          assists: 7, steals: 7, blocks: 15, slamDunks: 10
        },
        "DeSagna Diop": {
          number: 2, shoe: 14, points: 24, rebounds: 12,
          assists: 12, steals: 4, blocks: 5, slamDunks: 5
        },
        "Ben Gordon": {
          number: 8, shoe: 15, points: 33, rebounds: 3,
          assists: 2, steals: 1, blocks: 1, slamDunks: 0
        },
        "Brendan Haywood": {
          number: 33, shoe: 15, points: 6, rebounds: 12,
          assists: 12, steals: 22, blocks: 5, slamDunks: 12
        }
      }
    }
  };
}

function findPlayer(playerName) {
  const game = gameObject();
  return game.home.players[playerName] || game.away.players[playerName];
}

// 1. Returns number of points scored by player
function numPointsScored(playerName) {
  const player = findPlayer(playerName);
  return player ? player.points : null;
}

// 2. Returns shoe size of player
function shoeSize(playerName) {
  const player = findPlayer(playerName);
  return player ? player.shoe : null;
}

// 3. Returns team colors
function teamColors(teamName) {
  const game = gameObject();
  if (game.home.teamName === teamName) return game.home.colors;
  if (game.away.teamName === teamName) return game.away.colors;
  return null;
}

// 4. Returns array of team names
function teamNames() {
  const game = gameObject();
  return [game.home.teamName, game.away.teamName];
}

// 5. Returns array of jersey numbers for a team
function playerNumbers(teamName) {
  const game = gameObject();
  const team = game.home.teamName === teamName ? game.home : 
               game.away.teamName === teamName ? game.away : null;
  
  if (!team) return null;
  
  return Object.values(team.players).map(player => player.number);
}

// 6. Returns player stats
function playerStats(playerName) {
  return findPlayer(playerName);
}

// 7. Returns rebounds of player with largest shoe size
function bigShoeRebounds() {
  const game = gameObject();
  let largestShoeSize = 0;
  let playerWithLargestShoe = null;
  
  // Check home team players
  for (const playerName in game.home.players) {
    const player = game.home.players[playerName];
    if (player.shoe > largestShoeSize) {
      largestShoeSize = player.shoe;
      playerWithLargestShoe = player;
    }
  }
  
  // Check away team players
  for (const playerName in game.away.players) {
    const player = game.away.players[playerName];
    if (player.shoe > largestShoeSize) {
      largestShoeSize = player.shoe;
      playerWithLargestShoe = player;
    }
  }
  
  return playerWithLargestShoe.rebounds;
}

// Bonus Questions

// 1. Player with most points
function mostPointsScored() {
  const game = gameObject();
  let maxPoints = 0;
  let topPlayer = null;
  
  // Combine all players
  const allPlayers = {...game.home.players, ...game.away.players};
  
  for (const playerName in allPlayers) {
    const player = allPlayers[playerName];
    if (player.points > maxPoints) {
      maxPoints = player.points;
      topPlayer = playerName;
    }
  }
  
  return topPlayer;
}

// 2. Team with most points
function winningTeam() {
  const game = gameObject();
  
  const homePoints = Object.values(game.home.players)
    .reduce((sum, player) => sum + player.points, 0);
  
  const awayPoints = Object.values(game.away.players)
    .reduce((sum, player) => sum + player.points, 0);
  
  return homePoints > awayPoints ? game.home.teamName : game.away.teamName;
}

// 3. Player with longest name
function playerWithLongestName() {
  const game = gameObject();
  let longestName = "";
  
  // Combine all players
  const allPlayers = {...game.home.players, ...game.away.players};
  
  for (const playerName in allPlayers) {
    if (playerName.length > longestName.length) {
      longestName = playerName;
    }
  }
  
  return longestName;
}

// Super Bonus
function doesLongNameStealATon() {
  const longestNamePlayer = playerWithLongestName();
  const game = gameObject();
  let maxSteals = 0;
  
  // Combine all players
  const allPlayers = {...game.home.players, ...game.away.players};
  
  // Find max steals
  for (const playerName in allPlayers) {
    const player = allPlayers[playerName];
    if (player.steals > maxSteals) {
      maxSteals = player.steals;
    }
  }
  
  // Check if longest name player has max steals
  return allPlayers[longestNamePlayer].steals === maxSteals;
}