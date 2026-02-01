

export type Algorithm = "AES" | "AES-GCM" | "RSA" | "DES" | "3DES" | "Blowfish" | "ChaCha20";

export interface EncryptedPayload {
  algorithm: Algorithm;
  cipher: string;
  
  iv?: string;
  salt?: string;

  meta?: Record<string, unknown>;
}

