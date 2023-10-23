// src/hooks/useFighterURLRecord.js

import { useState, useEffect } from "react";
import supabase from "~/utils/supabase";

const useFighterURLRecord = (fighterURL) => {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      console.log("Fetching record for fighterURL:", fighterURL); // Log the fighterURL being used
      const { data, error } = await supabase
        .from("Fighters")
        .select("Record")
        .eq("FighterURL", fighterURL)
        .single(); // assuming FighterURL is unique

      if (error) {
        console.error('Error fetching fighter record:', error.message);  // Log any error messages
        return;
      }

      setRecord(data.Record);
    };

    fetchRecord();
  }, [fighterURL]);

  console.log('Record state:', record);  // Log the current state of 'record'

  return record;
};

export default useFighterURLRecord;
