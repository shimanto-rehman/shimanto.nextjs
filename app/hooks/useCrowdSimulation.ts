import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CrowdSimulationConfig {
  src: string;
  rows: number;
  cols: number;
}

interface GSAPTimeline {
  timeScale: (value: number) => GSAPTimeline;
  to: (target: any, vars: any, position?: number | string) => GSAPTimeline;
  eventCallback: (type: string, callback?: () => void) => void;
  progress: (value: number) => void;
  kill: () => void;
}

/**
 * Hook to initialize crowd simulation animation
 * @param canvasRef - Ref to canvas element
 * @param config - Configuration for crowd simulation
 */
export function useCrowdSimulation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  config: CrowdSimulationConfig = {
    src: '/images/testimonial/crowdsimulator/peeps-sheet.webp',
    rows: 15,
    cols: 7
  },
  enabled: boolean = true
) {
  const crowdInitialized = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined' || crowdInitialized.current) return;
    if (!canvasRef.current) {
      // Wait for canvas to be available
      const checkCanvas = setInterval(() => {
        if (canvasRef.current) {
          clearInterval(checkCanvas);
        }
      }, 100);
      return () => clearInterval(checkCanvas);
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Utils
    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => Math.floor(randomRange(0, array.length));
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) => removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array)];

    const stage = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    class Peep {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      sx: number;
      sy: number;
      sWidth: number;
      sHeight: number;
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: GSAPTimeline | null;

      constructor({ image, rect }: { image: HTMLImageElement; rect: number[] }) {
        this.image = image;
        this.rect = rect;
        this.width = rect[2];
        this.height = rect[3];
        this.sx = rect[0];
        this.sy = rect[1];
        this.sWidth = rect[2];
        this.sHeight = rect[3];
        this.x = 0;
        this.y = 0;
        this.anchorY = 0;
        this.scaleX = 1;
        this.walk = null;
      }

      render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, 1);
        ctx.drawImage(
          this.image,
          this.sx,
          this.sy,
          this.sWidth,
          this.sHeight,
          0,
          0,
          this.width,
          this.height
        );
        ctx.restore();
      }
    }

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const resetPeep = ({ stage, peep }: { stage: { width: number; height: number }; peep: Peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const easeFn = gsap.parseEase('power2.in') || ((t: number) => t * t);
      const offsetY = 100 - 250 * easeFn(Math.random());
      const startY = window.innerHeight - peep.height + offsetY;
      let startX: number, endX: number;

      if (direction === 1) {
        startX = -peep.height;
        endX = window.innerHeight + 800;
        peep.scaleX = 1;
      } else {
        startX = window.innerHeight + peep.width + 800;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    interface WalkProps {
      startX: number;
      startY: number;
      endX: number;
    }

    const normalWalk = ({ peep, props }: { peep: Peep; props: WalkProps }): GSAPTimeline => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, {
        duration: xDuration,
        x: endX,
        ease: 'none'
      }, 0);
      tl.to(peep, {
        duration: yDuration,
        repeat: xDuration / yDuration,
        yoyo: true,
        y: startY - 10
      }, 0);

      return tl as GSAPTimeline;
    };

    const walks = [normalWalk];

    const createPeeps = (img: HTMLImageElement) => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(new Peep({
          image: img,
          rect: [
            (i % rows) * rectWidth,
            Math.floor(i / rows) * rectHeight,
            rectWidth,
            rectHeight,
          ]
        }));
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({ peep, stage })
      });
      
      if (walk) {
        walk.eventCallback('onComplete', () => {
          removePeepFromCrowd(peep);
          addPeepToCrowd();
        });
      }

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        const walk = addPeepToCrowd().walk;
        if (walk) {
          walk.progress(Math.random());
        }
      }
    };

    const render = () => {
      if (!canvas || !ctx) return;
      canvas.width = canvas.width; // Clear canvas
      ctx.save();
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const img = new Image();
    
    const init = () => {
      createPeeps(img);
      resize();
      gsap.ticker.add(render);
      window.addEventListener('resize', resize);
    };

    img.onload = init;
    img.src = config.src;

    crowdInitialized.current = true;

    return () => {
      window.removeEventListener('resize', resize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
      crowd.length = 0;
      availablePeeps.length = 0;
      allPeeps.length = 0;
      crowdInitialized.current = false;
    };
  }, [canvasRef, config.src, config.rows, config.cols, enabled]);
}

