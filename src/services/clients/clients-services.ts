import { supabase } from "../../supabase-client";

const getClients = async () => {
  const { data, error } = await supabase.from("clients").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export { getClients };
