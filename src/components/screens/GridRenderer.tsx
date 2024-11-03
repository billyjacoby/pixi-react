import type { Grid } from "@/types";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const GridRenderer = ({
	grid,
	onUpdateTile,
	availableItems,
}: {
	grid: Grid;
	onUpdateTile: (x: number, y: number, value: string) => void;
	availableItems: string[];
}) => {
	return (
		<div>
			{grid.map((row, y) => (
				<div key={y.toString()} className="flex flex-col py-1">
					<div className="flex flex-row gap-1">
						{row.map((cell, x) => (
							<Popover key={x.toString()}>
								<PopoverTrigger asChild>
									<Button className="w-10 h-10 hover:bg-green-500">
										{cell}
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									Select a new item:
									<div className="flex flex-col gap-1">
										{availableItems.map((item) => (
											<Button
												key={item}
												onClick={() => onUpdateTile(x, y, item)}
												disabled={cell === item}
											>
												{item}
											</Button>
										))}
									</div>
								</PopoverContent>
							</Popover>
						))}
					</div>
				</div>
			))}
		</div>
	);
};
