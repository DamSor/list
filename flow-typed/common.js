// @flow
import type { Action as _Action } from "../src/redux/actionTypes";

declare type Dispatch = (action: Action) => any;
declare type Action = _Action;

declare type Category = {
  id: string,
  name: string,
  created_at: string,
  updated_at: string,
  _links: {
    self: {
      href: string
    }
  }
};

declare type Author = {
  id: string,
  full_name: string,
  gender: "female" | "male",
  role: "editor" | "commentator",
  created_at: string,
  updated_at: string,
  _links: {
    self: {
      href: string
    }
  }
};

declare type Post = {
  id: string,
  author_id: string,
  category_id: string,
  title: string,
  lead: string,
  content: string,
  created_at: string,
  updated_at: string,
  _links: {
    self: {
      href: string
    }
  },
  category?: Category,
  author?: Author
};
