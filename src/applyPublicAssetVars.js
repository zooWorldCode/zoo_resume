/** GitHub Pages 등 `base` 배포 시 CSS의 `/img/...` 절대 경로가 깨지지 않도록 변수 주입 */
export function applyPublicAssetVars() {
  const base = import.meta.env.BASE_URL;

  const root = document.documentElement;
  root.style.setProperty("--public-bg-tile", `url("${base}img/bg/bg.png")`);
  root.style.setProperty(
    "--public-cursor-normal",
    `url("${base}img/cursor/normal.png") 8 20, auto`,
  );
  root.style.setProperty(
    "--public-cursor-click",
    `url("${base}img/cursor/click.png") 8 20, pointer`,
  );
}
