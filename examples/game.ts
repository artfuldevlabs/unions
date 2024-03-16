import { generic2, has, of, recursive, union } from "../src";

const Game = union("Game")(
  recursive((Game) =>
    generic2((Board, Move) => ({
      Started: has(Board),
      Played: has(Move, Game),
      Ended: has(Game) 
    }))
  )
);
const started = Game.Started<"board", "move">("board");
const played = Game.Played("move", started);
const ended = Game.Ended(played);
