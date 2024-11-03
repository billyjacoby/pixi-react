import { gridFromString, stringFromGrid } from "@/lib/grid-utils";
import { levels, obstacleCells } from "@/lib/map";
import type { Grid, GridCell } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { GridRenderer } from "./GridRenderer";

export default function MapEditor() {
	const [currentLevelIndex, setCurrentLevelIndex] = React.useState(0);

	const currentLevel = levels[currentLevelIndex];
	const currentTileset = gridFromString(currentLevel.tileset);
	const currentObstacles = gridFromString(currentLevel.obstacles);

	const [tileset, setTileset] = React.useState(currentTileset);
	const [obstacles, setObstacles] = React.useState(currentObstacles);

	const hasTilesetChanged =
		JSON.stringify(tileset) !== JSON.stringify(currentTileset);
	const hasObstaclesChanged =
		JSON.stringify(obstacles) !== JSON.stringify(currentObstacles);

	function updateGrid(
		grid: Grid,
		setGrid: (g: Grid) => void,
		x: number,
		y: number,
		value: string,
	) {
		const newGrid = [...grid];
		newGrid[y][x] = value as GridCell;
		setGrid(newGrid);
	}

	function onTilesetSave(grid: Grid) {
		const gridString = stringFromGrid(grid);
		navigator.clipboard.writeText(JSON.stringify(gridString));
		console.log(gridString);
	}

	return (
		<div className="w-screen flex flex-col items-center gap-2">
			<h1 className="text-center text-2xl font-bold py-4">Map Editor</h1>
			<div> Current Level: {currentLevel.name}</div>
			<div className="text-center">
				<h2>Available Levels:</h2>
				<div className="flex flex-row gap-2">
					{levels.map((level, index) => (
						<Button
							key={index.toString()}
							onClick={() => setCurrentLevelIndex(index)}
						>
							{level.name}
						</Button>
					))}
					<Button>Add new level</Button>
				</div>
			</div>
			<div className="flex flex-row gap-2">
				<div className="flex-grow">
					<h2 className="font-semibold text-3xl">Tileset:</h2>
					<div>
						<GridRenderer
							grid={tileset}
							availableItems={["0"]}
							onUpdateTile={(...args) =>
								updateGrid(tileset, setTileset, ...args)
							}
						/>
					</div>
					{hasTilesetChanged && (
						<div className="flex flex-row justify-center">
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"secondary"}
										onClick={() => onTilesetSave(tileset)}
									>
										Save Tileset
									</Button>
								</PopoverTrigger>
								<PopoverContent>Saved to clipboard!</PopoverContent>
							</Popover>
						</div>
					)}
				</div>
			</div>
			<div>
				<h2 className="font-semibold text-3xl">Obstacles:</h2>
				<GridRenderer
					grid={obstacles}
					availableItems={["0", ...obstacleCells] as unknown as string[]}
					onUpdateTile={(...args) =>
						updateGrid(obstacles, setObstacles, ...args)
					}
				/>
				{hasObstaclesChanged && (
					<div className="flex flex-row justify-center">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"secondary"}
									onClick={() => onTilesetSave(obstacles)}
								>
									Save Obstacles
								</Button>
							</PopoverTrigger>
							<PopoverContent>Saved to clipboard!</PopoverContent>
						</Popover>
					</div>
				)}
			</div>
		</div>
	);
}
