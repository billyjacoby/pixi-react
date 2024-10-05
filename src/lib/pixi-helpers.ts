import * as PIXI from 'pixi.js';

/**
 * @note !!Make sure pass a proper frameTemplate or frameTemplateExtractor!!
 * @frameTemplate a string that contains {{i}} which will be replaced with the frame number
 * @frameTemplateExtractor a function that receives the frame number and returns the specified frame string
 */
export type MakeAnimatedSpriteTexturesParams = {
  assetPath: string;
  frames: number;
  frameTemplate: string;
  frameTemplateExtractor?: (frameNumber: number) => string;
};

export async function makeAnimatedSpriteTextures({
  assetPath,
  frames,
  frameTemplate,
  frameTemplateExtractor,
}: MakeAnimatedSpriteTexturesParams) {
  await PIXI.Assets.load(assetPath);
  // create an array to store the textures
  const textures = [];
  let i;

  for (i = 0; i < frames; i++) {
    let framePath: string;
    if (frameTemplateExtractor) {
      framePath = frameTemplateExtractor(i);
    } else {
      framePath = frameTemplate.replace('{{i}}', i.toString());
    }
    const texture = PIXI.Texture.from(framePath);
    textures.push(texture);
  }

  return textures;
}
