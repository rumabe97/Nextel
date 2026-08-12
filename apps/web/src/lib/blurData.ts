// Low-resolution stand-ins shown while each photograph loads, so an image arrives by
// sharpening rather than by appearing. Without one, `next/image` renders nothing at all until
// the bytes land and the photo snaps in — which on a slow connection is the single most
// obvious "this page is still loading" tell the site has.
//
// Generated, not hand-written: each entry is the source file scaled to 12px wide and encoded
// as a JPEG, which lands around 230 bytes — roughly 300 bytes of base64 apiece, ~3KB for the
// set. Small enough to inline, and inlining is the point: a placeholder that needed its own
// request would arrive no sooner than the photo it is standing in for.
//
// To regenerate after changing or adding a photograph:
//   ffmpeg -i public/images/<file>.webp -vf scale=12:-1 -q:v 18 -f mjpeg - | base64 -w0
//
// The keys are the public paths, and `BlurredImage` is derived from them — so a component
// that takes one of these paths as a prop can be typed to accept only images that actually
// have a placeholder here, and adding a photo without one fails to compile rather than
// silently reverting to the hard pop.
export const BLUR_DATA = {
  '/images/about-hero.webp':
    'data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgkJCokKjExMTExMTo2Ojw8PDo6Ojo8PDxBQUFMTExBQUE8PEFBSEhMTFNVU05OTE5VVVpaWmxsZ2d+foKbm7r/xABYAAEBAAAAAAAAAAAAAAAAAAAGBQEBAAAAAAAAAAAAAAAAAAAAAxAAAgECBwEBAAAAAAAAAAAAAQIDAAQhETGxM6FygUERAQAAAAAAAAAAAAAAAAAAAAD/wAARCAAHAAwDASIAAhEAAxEA/9oADAMBAAIRAxEAPwBo1wwkkBGChcsj+a91atZTJErHXHo0Ek5pfK7CkdlwL93oiP/Z',
  '/images/contact-skyline.webp':
    'data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgkJCokKjExMTExMTo2Ojw8PDo6Ojo8PDxBQUFMTExBQUE8PEFBSEhMTFNVU05OTE5VVVpaWmxsZ2d+foKbm7r/xABYAAADAQAAAAAAAAAAAAAAAAABAgYHAQEBAAAAAAAAAAAAAAAAAAAFBhAAAgEFAQAAAAAAAAAAAAAAAAECBBShQpFSEQEBAQAAAAAAAAAAAAAAAAAAEQH/wAARCAAGAAwDASIAAhEAAxEA/9oADAMBAAIRAxEAPwCbVZFaPo93Dw8GcBH6m5j/2Q==',
  '/images/home-hero.webp':
    'data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgkJCokKjExMTExMTo2Ojw8PDo6Ojo8PDxBQUFMTExBQUE8PEFBSEhMTFNVU05OTE5VVVpaWmxsZ2d+foKbm7r/xABXAAEBAQAAAAAAAAAAAAAAAAAEAwcBAQEAAAAAAAAAAAAAAAAAAAQFEAABBAIDAQAAAAAAAAAAAAABAAKBITHhUUESEREBAAAAAAAAAAAAAAAAAAAAAP/AABEIAAcADAMBIgACEQADEQD/2gAMAwEAAhEDEQA/AM1DvIrj5CMXNGbjSh0YQHZT0h//2Q==',
  '/images/office-meeting.webp':
    'data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgkJCokKjExMTExMTo2Ojw8PDo6Ojo8PDxBQUFMTExBQUE8PEFBSEhMTFNVU05OTE5VVVpaWmxsZ2d+foKbm7r/xABaAAEBAQAAAAAAAAAAAAAAAAAGAgQBAQAAAAAAAAAAAAAAAAAAAAMQAAEDAwQDAQAAAAAAAAAAAAERMQADIXEyYQIEI0HBEhEBAAAAAAAAAAAAAAAAAAAAAP/AABEIAAgADAMBIgACEQADEQD/2gAMAwEAAhEDEQA/AB1P8sEYuMWCmHuyPIbegyIqbWmum/HP2TX1wiP/2Q==',
  '/images/office-project.webp':
    'data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgkJCokKjExMTExMTo2Ojw8PDo6Ojo8PDxBQUFMTExBQUE8PEFBSEhMTFNVU05OTE5VVVpaWmxsZ2d+foKbm7r/xABZAAEBAQAAAAAAAAAAAAAAAAAGAwQBAQEAAAAAAAAAAAAAAAAAAAECEAACAQIHAQAAAAAAAAAAAAABAAQxEhEDE+GBUzJREQEAAAAAAAAAAAAAAAAAAAAA/8AAEQgACAAMAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8Avrxjl+AT8okLo3XhzulBRzKl/9k=',
  '/images/service-new-plant.webp':
    'data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgkJCokKjExMTExMTo2Ojw8PDo6Ojo8PDxBQUFMTExBQUE8PEFBSEhMTFNVU05OTE5VVVpaWmxsZ2d+foKbm7r/xABWAAEBAAAAAAAAAAAAAAAAAAAFBgEBAQAAAAAAAAAAAAAAAAAAAgMQAAICAgMBAAAAAAAAAAAAAAEAAgMxESGRcTMRAQEAAAAAAAAAAAAAAAAAAAAR/8AAEQgACAAMAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8ApxYdziBzHHatG0EDZDPV/azxJGG1GP/Z',
  '/images/service-photo-1.webp':
    'data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgkJCokKjExMTExMTo2Ojw8PDo6Ojo8PDxBQUFMTExBQUE8PEFBSEhMTFNVU05OTE5VVVpaWmxsZ2d+foKbm7r/xABSAAADAQAAAAAAAAAAAAAAAAAABAUGAQEAAAAAAAAAAAAAAAAAAAAGEAADAQEBAAAAAAAAAAAAAAAAIQIBETIRAQAAAAAAAAAAAAAAAAAAAAD/wAARCAAIAAwDASIAAhEAAxEA/9oADAMBAAIRAxEAPwA6iRlrGO15MkJwd//Z',
  '/images/service-photo-2.webp':
    'data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgkJCokKjExMTExMTo2Ojw8PDo6Ojo8PDxBQUFMTExBQUE8PEFBSEhMTFNVU05OTE5VVVpaWmxsZ2d+foKbm7r/xABeAAEBAQAAAAAAAAAAAAAAAAAGBQgBAQEAAAAAAAAAAAAAAAAAAAUGEAAABAQHAQAAAAAAAAAAAAABAEECcSERAwQjFMGRgTE0EQEBAQAAAAAAAAAAAAAAAAABAgD/wAARCAAIAAwDASIAAhEAAxEA/9oADAMBAAIRAxEAPwC0OWwXDKXqdk3rrS14qU+J+V8NwOaBSBaqk03Mjv/Z',
  '/images/service-site-management.webp':
    'data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgkJCokKjExMTExMTo2Ojw8PDo6Ojo8PDxBQUFMTExBQUE8PEFBSEhMTFNVU05OTE5VVVpaWmxsZ2d+foKbm7r/xABeAAEBAAAAAAAAAAAAAAAAAAAHBgEBAQAAAAAAAAAAAAAAAAAAAgMQAAEBBgcBAQAAAAAAAAAAAAEAAwIhBBIxM3KxoWHRURNBEQEBAQAAAAAAAAAAAAAAAAABAIH/wAARCAAHAAwDASIAAhEAAxEA/9oADAMBAAIRAxEAPwC7ZxeJjwPxEU078mpps8Ko+m+6XGPaLZ7FGQalAVNaF//Z',
  '/images/services-hero.webp':
    'data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMgD/2wBDAAgkJCokKjExMTExMTo2Ojw8PDo6Ojo8PDxBQUFMTExBQUE8PEFBSEhMTFNVU05OTE5VVVpaWmxsZ2d+foKbm7r/xABWAAEBAQAAAAAAAAAAAAAAAAAEAgYBAQEAAAAAAAAAAAAAAAAAAAMEEAACAgIDAQAAAAAAAAAAAAABAAQCETFCcSEDEQEAAAAAAAAAAAAAAAAAAAAA/8AAEQgACAAMAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8AZIkD6ivmC4QgZ21bj2iO1U7/2Q=='
} as const;

export type BlurredImage = keyof typeof BLUR_DATA;

/** Spread into `next/image` in place of `src`. Carries the path, the placeholder mode and the
 *  matching preview together, so the three can never drift apart at a call site. */
export function blurred(src: BlurredImage) {
  return { blurDataURL: BLUR_DATA[src], placeholder: 'blur' as const, src };
}
