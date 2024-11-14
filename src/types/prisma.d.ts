export { };

declare global {
  namespace PrismaJson {
    type Preferences = {
      active_daily_reminder: boolean;
      accept_terms_and_policy: boolean;
    }
  }
}