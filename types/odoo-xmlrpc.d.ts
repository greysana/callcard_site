declare module "odoo-xmlrpc" {
    interface OdooOptions {
      url: string;
      db: string;
      username: string;
      password: string;
    }
  
    class Odoo {
      constructor(options: OdooOptions);
      connect(callback: (err: Error | null, res: any) => void): void;
      execute_kw(
        model: string,
        method: string,
        params: any[],
        callback: (err: Error | null, res: any) => void
      ): void;
      call(
        model: string,
        method: string,
        params: any[],
        callback: (err: Error | null, res: any) => void
      ): void;
    }
  
    export default Odoo;
  }
  