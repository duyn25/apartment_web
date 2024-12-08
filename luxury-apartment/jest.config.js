module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)",
    ],
    // Các cấu hình khác nếu cần
  };
  