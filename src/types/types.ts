export type CommonResponse<T> = {
  incomplete_results: boolean;
  items: T;
  total_count: number;
};

export type UserType = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
  type: string;
};

export type RepositoryType = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: UserType;
  url: string;
  html_url: string;
  description: string;
  fork: boolean;
  topics: string[];
  created_at: string;
  updated_at: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  archived: false;
  disabled: false;
  forks: number;
  open_issues: number;
  watchers: number;
};

export type ParamsType = {
  q: string;
  page: number;
  per_page: number;
  sort: string;
  order: string;
};

export type ErrorMessage = {
  data: {
    message: string;
    errors: {
      resource: string;
      field: string;
      code: string;
    }[];
  };
  status: number;
};
