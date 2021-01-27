import layout from "./layout";

export const signinTemplate = () => {
  return layout({
    content: `
    <div>
      <form method="POST">
        <input name="email" placeholder="email"/>
        <input name="password" placeholder="password">
        <button>Sign In</button>
      </form>
    </div>
`,
  });
};
