declare global {
    var mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
  }
  
  // Pour faire reconnaître ce fichier comme un module :
  export {};
  