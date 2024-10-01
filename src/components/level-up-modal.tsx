'use client';

import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PartyPopper, Badge } from "lucide-react";
import { Modal } from '@/components/modal';

type LevelUpModalProps = {
  level: number;
  onContinue: () => void;
}

export const LevelUpModal: FC<LevelUpModalProps> = ({ level, onContinue }) => {
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setProgress(100);
    }, 250);

    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const progressBarElement = progressBarRef.current;

    if (!progressBarElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width >= 300) {
          setShowBadge(true);
        }
      }
    });

    resizeObserver.observe(progressBarElement);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Modal.Root>
      <Modal.Content>
        <div className="max-w-[400px] w-full h-[360px] flex flex-col items-center justify-center bg-white rounded-lg p-8">
          <div className="flex flex-col items-center">
            <h1 className="font-heading font-medium text-gray-600 text-3xl mb-1">Parabéns!</h1>
            <h2 className="font-heading font-medium text-gray-600 text-xl flex items-start gap-2">
              Você subiu de nível
              <PartyPopper />
            </h2>
          </div>

          {showBadge ? (
            <div className="mt-14 size-[80px] relative flex items-center justify-center animate-bounce">
              <Badge className="text-yellow-500 absolute" size={80} strokeWidth={1.7} />
              <span className="font-body font-semibold text-yellow-500 text-3xl">{level}</span>
            </div>
          ) : (
            <div className="max-w-[300px] w-full bg-gray-200 rounded-full h-2 mt-[70px] mb-[35px] relative">
              <div className="absolute max-w-[300px] w-full -top-6 flex items-center justify-between">
                <span className="font-body font-medium text-base text-gray-500">{level - 1}</span>
                <span className="font-body font-medium text-base text-gray-500">{level}</span>
              </div>
              <div ref={progressBarRef} className="bg-[#50B2C0] h-2 rounded-full transition-all duration-2000" style={{
                width: `${progress}%`
              }} />
            </div>
          )}

          {showBadge && (
            <Button
              onClick={onContinue}
              className="mt-10 text-white w-full py-3 rounded-xl flex items-center justify-center gap-2 font-body text-[18px] bg-[#50B2C0]">
              Continuar
            </Button>
          )}
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}