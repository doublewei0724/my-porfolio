import { writeFileSync } from "fs";
import { get } from "axios";
import { join } from "path";

(async () => {
  const url =
    "https://data.ntpc.gov.tw/api/datasets/010e5b15-3823-4b20-b401-b1cf000550c5/json";

  try {
    const res = await get(url);
    const data = res.data;

    const outputPath = join(__dirname, "../src/data/ubike.json");
    writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");

    console.log("✅ 更新完成：src/data/ubike.json");
  } catch (err) {
    console.error("❌ 抓取失败：", err.message);
    process.exit(1);
  }
})();