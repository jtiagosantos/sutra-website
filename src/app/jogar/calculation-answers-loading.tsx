import BubbleAnimation from '@/assets/bubble-spinner.svg';
import { Modal } from '@/components/modal';

export const CalculationAnswersLoading = () => {
  return (
    <Modal.Root>
      <Modal.Content>
        <div className="bg-white rounded-lg flex flex-col items-center justify-center gap-7 p-8">
          <BubbleAnimation />
          <p className="font-body font-medium text-gray-600 text-[18px]">
            Calculando Respostas Corretas...
          </p>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};