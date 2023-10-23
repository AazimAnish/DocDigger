"use client"

import React, { useEffect, useState } from "react";
import DataGrid from "./datagrid";
import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase URL and Anon Key
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const RepoFetch = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllRepositories = async () => {
    const { data, error } = await supabase.from("repositories").select("*");

    if (error) {
      console.error(error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  };

  const insertNewRepository = async ({ org, repo }) => {
    const { data, error } = await supabase
      .from("repositories")
      .upsert({ name: repo, org });

    if (error) {
      console.error(error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  };

  const fetchRepos = async () => {
    // Fetch data from GitHub API and insert into the Supabase table
    try {
      // Replace 'orgName' with the actual organization name you want to fetch
      const orgName = "supabase";

      const response = await fetch(`https://api.github.com/orgs/${orgName}/repos`);
      const reposData = await response.json();

      for (const repoData of reposData) {
        const existingRepos = await getAllRepositories();

        // Check if the repository already exists in the Supabase table
        const existingRepo = existingRepos.find((repo) => repo.name === repoData.name);

        if (!existingRepo) {
          await insertNewRepository({ org: orgName, repo: repoData.name });
        }
      }

      // Fetch the updated list of repositories from Supabase
      const updatedRepos = await getAllRepositories();

      setRepos(updatedRepos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching and inserting repositories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div>
      <h1>GitHub Repositories</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid data={repos} />
      )}
    </div>
  );
};

export default RepoFetch;