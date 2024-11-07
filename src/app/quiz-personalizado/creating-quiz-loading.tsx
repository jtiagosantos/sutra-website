'use client';

import { Hourglass } from 'react-loader-spinner';

export const CreateQuizLoading = () => {
  return (
    <>
      <h1 className="font-heading text-3xl text-center mt-8 text-[#8381D9] font-semibold">
        Estamos criando o seu quiz
      </h1>
      <p className="font-body text-base text-gray-500 mt-4 text-center">
        Esse processo pode levar alguns instantes, aguarde...
      </p>
      <p className="font-body text-base text-gray-500 mt-1 text-center">
        Não feche ou recarregue a página enquanto isso.
      </p>

      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperClass="mt-[100px]"
        colors={['#8381D9', '#2A2879']}
      />
    </>
  );
};
