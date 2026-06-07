import { FlappyBird } from "./game.js";

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;

var game = new FlappyBird(ctx, GAME_HEIGHT, GAME_WIDTH)
game.start()