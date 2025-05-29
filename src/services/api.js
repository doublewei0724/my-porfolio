export const fetchResults = async (date, gameId) => {
  try {
    const lotteryId = gameId === 1 ? 845 : 840;
    const url = `https://api.kjydh.com/data/${date}?LotteryId=${lotteryId}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP 错误: ${response.status}`);
    const data = await response.json();

    return (data.data || []).map(item => ({
      issue: item.GameId,
      issueTime: item.KaiTime,
      result: item.KaiText,
    }));
  } catch (error) {
    console.error("API 请求失败:", error);
    throw error;
  }
};