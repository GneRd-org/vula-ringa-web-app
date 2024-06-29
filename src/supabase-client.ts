import { createClient } from "@supabase/supabase-js";
import { environment } from "./environment";

const supabase = createClient(environment.dev.hostUrl, environment.dev.anonKey);

export { supabase };
