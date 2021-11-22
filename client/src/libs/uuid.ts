const windowCrypto = window.crypto as Crypto & { randomUUID: () => string };

export const getUuId = () => windowCrypto.randomUUID();
export const getSpanId = () => windowCrypto.randomUUID();
