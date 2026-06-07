import { FlappyBird } from "./game.js";
import { Bird } from "../entities/bird.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const player = new Bird();

const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;

var game = new FlappyBird(ctx, GAME_HEIGHT, GAME_WIDTH, player)
game.start()