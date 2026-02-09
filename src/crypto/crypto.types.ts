

export type Algorithm = "AES" | "AES-GCM" | "AES-CBC" | "RSA" | "DES" | "3DES" | "Blowfish" ;

export interface EncryptedPayload {
  algorithm: Algorithm;
  cipher: string;
  
  iv?: string;
  salt?: string;

  meta?: Record<string, unknown>;
}

export interface DecryptedPayload {
  algorithm: Algorithm;
  plainText: string;
}