import tilesetSpriteData from "../../../public/tilemaps/tiles.json";
import tilesetSpriteSheet from "../../../public/tilemaps/tiles.png";

function cropImageFromSpriteSheet(assetName: string) {
	const spriteData =
		tilesetSpriteData.frames?.[
			assetName as keyof typeof tilesetSpriteData.frames
		];

	if (!spriteData) {
		throw new Error(`Sprite data not found for asset: ${assetName}`);
	}
	return spriteData;
}

export function TilesetGenerator({ assetName }: { assetName: string }) {
	const tileData = cropImageFromSpriteSheet(assetName);
	return (
		<div
			className="relative overflow-hidden"
			style={{
				height: 256,
				width: 256,
			}}
		>
			<img
				src={tilesetSpriteSheet}
				alt="land_1 tile"
				style={{
					position: "absolute",
					objectFit: "none",
					objectPosition: `-${tileData.frame.x}px -${tileData.frame.y}px`,
					width: tilesetSpriteData.meta.size.w,
					height: tilesetSpriteData.meta.size.h,
				}}
			/>
		</div>
	);
}
