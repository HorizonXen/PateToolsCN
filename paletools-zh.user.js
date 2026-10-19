// ==UserScript==
// @name         Paletools 简体中文
// @namespace    eafcmaster.paletools.zh
// @version      1.1.0
// @description  把 Paletools 27.1.5 在中文网页上回退显示的英文界面换成简体中文。不修改 Paletools 本体，官方自动更新不会清掉这份翻译。
// @author       HorizonXen
// @updateURL    https://raw.githubusercontent.com/HorizonXen/PateToolsCN/main/paletools-zh.user.js
// @downloadURL  https://raw.githubusercontent.com/HorizonXen/PateToolsCN/main/paletools-zh.user.js
// @match        https://www.ea.com/ea-sports-fc/ultimate-team/web-app/*
// @match        https://www.ea.com/*/ea-sports-fc/ultimate-team/web-app/*
// @match        https://www.futbin.com/*
// @match        https://www.easysbc.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const PAIRS = [["<ul><li><b>Opened Packs:</b><span>{packs}</span></li><li><b>Total Players:</b><span>{players}</span></li><li><b>Players sent to Club:</b><span>{playersToClub}</span></li><li><b>Players sent to Transfer list:</b><span>{playersToTransfer}</span></li><li><b>Discarded Players:</b><span>{playersDiscarded}</span></li><li><b>Duplicated Players:</b><span>{duplicatedPlayers}</span></li><li><b>Total Managers:</b><span>{managers}</span></li><li><b>Managers sent to Club:</b><span>{managersToClub}</span></li><li><b>Managers sent to Transfer List:</b><span>{managersToTransfer}</span></li><li><b>Discarded Managers:</b><span>{managersDiscarded}</span></li><li><b>Duplicated Managers:</b><span>{duplicatedManagers}</span></li><li><b>Total Items:</b><span>{items}</span></li><li><b>Items sent to Club:</b><span>{itemsToClub}</span></li><li><b>Items sent to Transfer List:</b><span>{itemsToTransfer}</span></li><li><b>Discarded Items:</b><span>{itemsDiscarded}</span></li><li><b>Duplicated Items:</b><span>{duplicatedItems}</span></li><li><b>Coins Spent:</b><span>{coinsSpent}</span></li><li><b>Coins Earned:</b><span>{coinsEarned}</span></li></ul>","<ul><li><b>已打开的卡包：</b><span>{packs}</span></li><li><b>球员总数：</b><span>{players}</span></li><li><b>送到俱乐部的球员：</b><span>{playersToClub}</span></li><li><b>送到转会列表的球员：</b><span>{playersToTransfer}</span></li><li><b>丢弃的球员：</b><span>{playersDiscarded}</span></li><li><b>重复球员：</b><span>{duplicatedPlayers}</span></li><li><b>经理总数：</b><span>{managers}</span></li><li><b>送到俱乐部的经理：</b><span>{managersToClub}</span></li><li><b>送到转会列表的经理：</b><span>{managersToTransfer}</span></li><li><b>丢弃的经理：</b><span>{managersDiscarded}</span></li><li><b>重复经理：</b><span>{duplicatedManagers}</span></li><li><b>物品总数：</b><span>{items}</span></li><li><b>送到俱乐部的物品：</b><span>{itemsToClub}</span></li><li><b>送到转会列表的物品：</b><span>{itemsToTransfer}</span></li><li><b>丢弃的物品：</b><span>{itemsDiscarded}</span></li><li><b>重复物品：</b><span>{duplicatedItems}</span></li><li><b>花费金币：</b><span>{coinsSpent}</span></li><li><b>获得金币：</b><span>{coinsEarned}</span></li></ul>"],["<p>Dear user, since Paletools allows you to perform actions that were not design by EA and allows you to be much quicker in the usage of the WebApp you are at a potential risk of ban from EA</p><p><br /></p><p>Therefore you shall use it at your own discretion and you should be very cautious</p><p><br /></p><p>If you perform too many snipes in a row you might get a soft market ban or even worst a <b>permanent ban from the transfer market</b></p><p><br /></p><p>Please <b>USE THIS TOOL AT YOUR OWN RISK</b></p><p><br /></p><p>Thanks a have a nice day!</p>","<p>Paletools 能执行 EA 没有设计的操作，也会让你更快地使用网页。因此存在被 EA 封禁的风险。</p><p><br /></p><p>是否使用由你自己决定，请保持谨慎。</p><p><br /></p><p>如果连续进行太多次截卡，可能会被暂时限制市场，甚至被<b>永久禁止使用转会市场</b>。</p><p><br /></p><p>请<b>自行承担使用风险</b></p><p><br /></p><p>谢谢，祝你有美好的一天！</p>"],["Choose any transfer market filters and enter a maximum Buy Now price. Selecting a specific player is optional. Each search and each buy counts as one attempt, including empty searches and unsuccessful buys; Multiple cards can be bought from each result list, up to the total card limit. Leaving this screen stops sniping.","选择任意转会市场筛选条件并填写最高立即购买价格。指定球员可以不选。每次搜索和每次购买都计为一次尝试，包括没有结果的搜索和未成功的购买。每个结果列表可以买到多张卡，直到达到总数量上限。离开此画面会停止截卡。"],["========== PALETOOLS ==========\n\nSBC succesfully exported, now go to Paletools and hit import SBC button\n\n========================================\n\nSBC exportado correctamente, ahora ve a Paletools y presiona el boton importar SBC","========== PALETOOLS ==========\n\nSBC 已导出。回到网页，打开同一组 SBC，点击“导入 SBC”。\n\n在此之前不要复制其他文字。"],["Preview based on your club and collection status, not a submitted in-game grade. Historical first-owner and cosmetic details may be unavailable. Auto-fill starts with the highest item scores; change cards to improve bonuses.","此预览依据你的俱乐部和收集状态，不是游戏内已提交的等级。历史一手和外观信息可能缺失。自动填充从物品分数最高的卡开始；更换卡牌可以提高加成。"],["========== PALETOOLS ALERT ==========\n\nYou need to be in an SBC solution for this tool to work!\n\n========================================\n\n¡Usted necesita estar en una solución de SBC para que funcione esta herramienta!","========== PALETOOLS 提示 ==========\n\n这个书签只能在 SBC 方案页使用。\n\nFUTBIN 地址需要包含 /squad/数字/sbc。\nEasySBC 地址需要包含 easysbc.io/sbc-solution。"],["Dear user, since Paletools allows you to perform actions that were not design by EA and allows you to be much quicker in the usage of the WebApp you are at a potential risk of ban from EA","Paletools 能执行 EA 没有设计的操作，也会让你更快地使用网页。因此存在被 EA 封禁的风险。"],["No exact-score solution exists with your filters and the submission limit. Smallest excess first, then fewest players. Select a solution, then submit its players.","在当前筛选和提交上限下没有精确分数方案。优先显示超出最少、球员更少的方案。选择一个方案，然后提交其中的球员。"],["This set spans the full catalogue. Showing eligible club cards and known tracked history; historical Holographics require recorded cosmetic details.","此套装覆盖全部卡池。这里显示俱乐部中符合条件的卡牌和已知收集记录；历史全息卡需要已记录的外观信息。"],["selected cards use the base OVR score because their full item score is unavailable. Rarity or Holographic bonuses may increase the actual result.","张已选卡牌只能使用基础总评分数，因为缺少完整物品分数。稀有度或全息加成可能会提高实际结果。"],["<p>The import process will clear all your data before inserting the new one</p><br /><br /><h3>Are you sure you want to proceed?</h3><br /><br />","<p>导入会先清空你的全部数据，再写入新数据</p><br /><br /><h3>确定要继续吗？</h3><br /><br />"],["This is an automation feature, your account could potentially be banned if you are abusing of it, are you sure you want to enable it?","这是自动化功能。如果滥用，账号有可能被封禁。确定要启用吗？"],["Players count (including duplicated, not including loans) in club + unnasigned up to 50, watchlist (won) up to 100 and tradepile","俱乐部加未分配中的球员数量（含重复、不含租借，最多 50），关注列表（已赢得，最多 100）和转会列表"],["This is an experimental feature and could potentially lead to you account being banned, are you sure you want to enable it?","这是实验功能，启用后有可能导致账号被封禁。确定要启用吗？"],["WARNING: Enabling this plugin could eventually lead to a potential BAN from EA, are you sure you want to continue?","警告：启用此功能可能最终导致 EA 封禁账号。确定要继续吗？"],["Stopped because the next solution requires concept players. Only repetitions without concept players are shown.","下一次方案需要概念球员，因此已停止。这里只显示不需要概念球员的重复次数。"],["Each tag applies its highest qualifying tier to the scores of matching cards. Expand a tag to see every tier.","每个标签对符合条件的卡牌使用其最高达标档。展开标签可查看每一档。"],["Missing players appear as concepts. Collected players appear in full color based on their collection status.","缺少的球员显示为概念卡。已收集的球员按收集状态以完整颜色显示。"],["No different eligible players can keep this rating combination and score. The current solution is unchanged.","没有其他符合条件的球员能保持这个评分组合和分数。当前方案未改变。"],["Submission could not be confirmed. Go back and reload the challenge before generating new solutions.","无法确认提交。请返回并重新加载挑战，再生成新方案。"],["There are too many score combinations. Narrow the rating range or use storage only and try again.","分数组合太多。缩小评分范围，或改为只使用仓库后再试。"],["Enter a maximum Buy Now price, valid price ranges, delays, attempt limit and card limit.","请填写最高立即购买价格、有效价格区间、延迟、尝试次数和卡牌数量。"],["Exact-score solutions, fewest players first. Select a solution, then submit its players.","精确分数方案，优先使用更少球员。选择一个方案，然后提交其中的球员。"],["If you perform too many snipes in a row you might get a soft market ban or even worst a ","如果连续进行太多次截卡，可能会被暂时限制市场，甚至被"],["Delay between buys from the same list (milliseconds, minimum 1000, randomized ±200)","同一列表中两次购买之间的延迟（毫秒，最少 1000，随机上下 200）"],["No solution reaches the remaining score with your filters and the submission limit.","在当前筛选和提交上限下，没有方案能达到剩余分数。"],["Only some requested challenges could be solved. Showing solvable challenges only.","只有一部分请求的挑战能够求解。这里只显示可以完成的挑战。"],["Therefore you shall use it at your own discretion and you should be very cautious","是否使用由你自己决定，请保持谨慎。"],["Please reload the page and re-execute Paletools for the changes to take effect","请刷新页面并重新运行 Paletools，更改才会生效"],["The challenge or selected players changed. Go back and generate new solutions.","挑战或已选球员已改变。请返回并重新生成方案。"],["¿What should I do with duplicated items that are NOT players and NOT managers?","重复的、既不是球员也不是经理的物品要如何处理？"],["There was an error importing the SBC, make sure you use the Export SBC first","导入 SBC 失败。请先使用“导出 SBC”。"],["Card will be ignored if teh price range does not fall in the provided values","如果价格区间不在所填范围内，这张卡会被跳过"],["Already submitted: {submitted} / {required} · Remaining score: {remaining}","已提交：{submitted} / {required} · 剩余分数：{remaining}"],["This challenge has an unsupported score requirement or submission limit.","此挑战的分数要求或提交上限不受支持。"],["The import process will clear all your data before inserting the new one","导入会先清空你的全部数据，再写入新数据"],["Delay between searches (milliseconds, minimum 1000, randomized ±200)","两次搜索之间的延迟（毫秒，最少 1000，随机上下 200）"],["Could not load the challenge or eligible players. Please try again.","无法读取挑战或符合条件的球员。请再试一次。"],["¿What should I do with items that are NOT players and NOT managers?","既不是球员也不是经理的物品要如何处理？"],["You are not allowed to send an SBC, please wait #SECONDS# seconds","现在不能提交 SBC，请等待 #SECONDS# 秒"],["{players} players · Score {score} / {target} · Excess {excess}","{players} 名球员 · 分数 {score} / {target} · 超出 {excess}"],["You have reached the limit of {players} players you can listÂº","已达到可上架的 {players} 名球员上限"],["Display if a card is pristine (1 owner) only on search results","仅在搜索结果中显示是否为一手卡"],["Enable Price Tracker and External Market Prices in settings.","请先在设置中启用价格追踪和外部市场价格。"],["Please wait {seconds} seconds before performing another list","请等待 {seconds} 秒后再进行下一次上架"],["Could not access saved players. Reopen the view to retry.","无法读取已保存的球员。重新打开此页面再试。"],["Could not load this club. Select the club again to retry.","无法加载此俱乐部。请重新选择再试。"],["No repetitions can be solved without concept players.","没有可以在不使用概念球员的情况下完成的重复次数。"],["Could not update player tracking. Please try again.","无法更新球员追踪。请再试一次。"],["SBC Aborted - You have locked players in your squad","SBC 已中止：阵容里有已锁定的球员"],["Could not load this set. Select it again to retry.","无法加载此套装。请重新选择再试。"],["Could not save first ownership. Please try again.","无法保存一手状态。请再试一次。"],["¿What should I do when the transfer list is full?","转会列表已满时要如何处理？"],["Stop processing then the SBC requirements are met","满足 SBC 要求后停止"],["Use legacy mode for buying cards (palesnipe 3.1)","使用旧版购买方式（palesnipe 3.1）"],["If you enjoy Paletools please consider donating","如果你觉得 Paletools 有用，可以考虑捐赠"],["No unfinished one-click challenge is available.","没有未完成的一键挑战。"],["Send Non Duplicated From Transfer List to Club","把转会列表中的非重复卡送到俱乐部"],["Do you want to send locked duplicated players?","要把已锁定的重复球员送出吗？"],["Move Unassigned Players To Club After Submit","提交后把未分配球员移到俱乐部"],["Select a set to view its cards and grading.","选择一个套装以查看卡牌和评分等级。"],["¿What should I do with duplicated managers?","重复经理要如何处理？"],["Today its June 2nd, its Paleta's Birthday!","今天是 6 月 2 日，Paleta 的生日！"],["Drag the install link to the bookmarks bar","把安装链接拖到书签栏"],["¿What should I do with duplicated players?","重复球员要如何处理？"],["Add a player revision to track its price.","添加一个球员版本以追踪价格。"],["Select at least one repetition to submit.","请至少选择一次重复再提交。"],["Search failed. Reopen the view to retry.","搜索失败。重新打开此页面再试。"],["Maximum snipe attempts (searches + buys)","最大截卡尝试次数（搜索 + 购买）"],["Challenge {current}/{total}: {challenge}","挑战 {current}/{total}：{challenge}"],["There has been an error opening the pack","打开卡包时出错"],["Select a player to see their revisions.","选择一名球员以查看其各个版本。"],["Fill every slot to qualify for a grade.","填满每个位置后才能获得等级。"],["Hide player duplicates in Market Search","在市场搜索中隐藏重复球员"],["Enable Auto Snipe and Paletools first.","请先启用自动截卡和 Paletools。"],["permanent ban from the transfer market","永久禁止使用转会市场"],["Replace players with the same ratings","换成相同评分的球员"],["more matching cards to the next tier","张匹配卡牌即可进入下一档"],["Loading club players: {count} loaded","正在读取俱乐部球员：已加载 {count}"],["Unassigned Quick Sell Non Duplicates","未分配：快速出售非重复卡"],["Select cheapest player automatically","自动选择最便宜的球员"],["Enable Gallery and Paletools first.","请先启用展馆和 Paletools。"],["Stopping after the current request…","当前请求结束后停止…"],["Player Name copied to the clipboard","球员姓名已复制到剪贴板"],["Display One Touch Snipe +Bid button","显示一键截卡 +出价按钮"],["Display One Touch Snipe +Buy button","显示一键截卡 +立即购买按钮"],["Select a club to view its players.","选择一个俱乐部以查看其球员。"],["Request timed out; sniping stopped","请求超时，截卡已停止"],["Item bought succesfully! - {coins}","购买成功！- {coins}"],["Loading unassigned players data...","正在加载未分配球员数据…"],["Club Index: {count} players loaded","俱乐部索引：已加载 {count} 名球员"],["Enable Album and Paletools first.","请先启用图鉴和 Paletools。"],["Are you sure you want to proceed?","确定要继续吗？"],["Loading players... {count} loaded","正在加载球员……已加载 {count}"],["Loading players {count} loaded...","正在加载球员，已加载 {count}…"],["Quick market list - show buttons","快速上架 - 显示按钮"],["Quick market list - auto publish","快速上架 - 自动发布"],["Unassigned Quick Sell Duplicates","未分配：快速出售重复卡"],["Mas Barato: {name} - {minBuyNow}","最便宜：{name} - {minBuyNow}"],["Ignore players with one revision","忽略只有一个版本的球员"],["SBC times completed notification","SBC 完成次数提示"],["¿What should I do with managers?","经理要如何处理？"],["No players found for this club.","此俱乐部没有找到球员。"],["Request failed; sniping stopped","请求失败，截卡已停止"],["Always display apply consumable","始终显示使用消耗品"],["Select previous player in lists","选择列表中的上一名球员"],["Select Multiple Players on SBCs","在 SBC 中多选球员"],["Disable Pack Opening Animations","关闭开包动画"],["¿What should I do with players?","球员要如何处理？"],["Managers sent to Transfer List:","送到转会列表的经理："],["Could not save player history.","无法保存球员历史。"],["Number of cards to buy (total)","要购买的卡牌数量（总计）"],["Display Extra Card Information","显示额外卡牌信息"],["Only # packs left to be opened","只剩 # 个卡包可打开"],["¿How many packs should I open?","要打开多少个卡包？"],["Remove Exchange Players Button","移除交换球员按钮"],["-- Select a Global Template --","-- 选择一个全局模板 --"],["USE THIS TOOL AT YOUR OWN RISK","自行承担使用风险"],["Players sent to Transfer list:","送到转会列表的球员："],["Grading score (highest first)","等级分数（从高到低）"],["Maximum buy now price (coins)","最高立即购买价格（金币）"],["-- Select a filter to load --","-- 选择要加载的筛选 --"],["Use Only Players From Storage","只使用仓库球员"],["Display alternative positions","显示其他位置"],["Save Transactions Information","保存交易信息"],["Important Leagues and Nations","重要联赛和国家"],["Add Multiple Players To Squad","向阵容添加多名球员"],["Top score threshold reached.","已达到最高分数门槛。"],["Specify how many repetitions","指定重复次数"],["Repetition {current}/{total}","第 {current}/{total} 次"],["Highlight duplicated players","高亮重复球员"],["Important Leagues at the top","重要联赛排在前面"],["Prices last updated - {date}","价格更新时间 - {date}"],["Items sent to Transfer List:","送到转会列表的物品："],["Copy Player Id to clipboard","复制球员 ID 到剪贴板"],["Select next player in lists","选择列表中的下一名球员"],["Unassigned to Transfer List","未分配：送到转会列表"],["Auto solving was cancelled.","自动求解已取消。"],["Send Non Duplicated To Club","把非重复卡送到俱乐部"],["Sell multiple items at once","一次出售多件物品"],["Not Important Leagues Only","仅非重要联赛"],["Not Important Nations Only","仅非重要国家"],["Max Players From Same Club","同一俱乐部最多球员数"],["Enabled Holographic Filter","启用全息筛选"],["Auto press ENTER after buy","购买后自动按回车"],["Send item to transfer list","把物品送到转会列表"],["Decrease min buy now value","降低最低立即购买价"],["Increase min buy now value","提高最低立即购买价"],["Decrease max buy now value","降低最高立即购买价"],["Increase max buy now value","提高最高立即购买价"],["More Times Completed first","完成次数更多的优先"],["Allow Players From Storage","允许使用仓库球员"],["Highlight Important League","高亮重要联赛"],["Unassigned Quick Sell All","未分配：全部快速出售"],["Invalid repetitions value","重复次数无效"],["Loading watchlist data...","正在加载关注列表数据…"],["Loading tradepile data...","正在加载转会列表数据…"],["Calculate Missing Ratings","计算缺少的评分"],["No pack has been selected","还没有选择卡包"],["The transfer list is full","转会列表已满"],["Send to Field to Position","放到场上的指定位置"],["Locked Duplicated Players","已锁定的重复球员"],["Use Transfer List players","使用转会列表中的球员"],["Execute after (SBC count)","在完成若干次 SBC 后执行"],["PALETOOLS - USAGE WARNING","PALETOOLS 使用警告"],["Thanks a have a nice day!","谢谢，祝你有美好的一天！"],["No eligible cards found.","没有符合条件的卡牌。"],["Bonus tags & multipliers","加成标签与倍率"],["OVR base score reference","总评基础分数对照"],["Lowest To Highest Rating","评分从低到高"],["Highest To Lowest Rating","评分从高到低"],["Ignore Players Positions","忽略球员位置"],["Find lowest market price","查找市场最低价"],["Unassigned Store in Club","未分配：存入俱乐部"],["Submit selected solution","提交所选方案"],["Ignore Important Leagues","忽略重要联赛"],["Ignore Important Nations","忽略重要国家"],["Ignore for special cards","特殊卡不忽略"],["Display untradeable icon","显示不可交易图标"],["Find Lowest Market Price","查找市场最低价"],["Auto Relist Unsold Items","自动重新上架未售出物品"],["Auto Reclaim SBC Rewards","自动领取 SBC 奖励"],["One-click SBC solutions","一键 SBC 方案"],["Closes expiration first","即将到期的优先"],["Keep player sell values","保留球员出售价格"],["Type of currency to use","使用的货币类型"],["Loading gallery cards…","正在加载展馆卡牌…"],["Rating (highest first)","评分（从高到低）"],["Important Leagues Only","仅重要联赛"],["Important Nations Only","仅重要国家"],["Decrease min bid value","降低最低出价"],["Increase min bid value","提高最低出价"],["Decrease max bid value","降低最高出价"],["Increase max bid value","提高最高出价"],["Improved player search","改进的球员搜索"],["Processing information","正在处理信息"],["Use duplicated players","使用重复球员"],["Use unassigned players","使用未分配球员"],["External Market Prices","外部市场价格"],["Remove Rounded Corners","去掉圆角"],["Managers sent to Club:","送到俱乐部的经理："],["Collected cards first","已收集的卡牌优先"],["Enable Copy Player Id","启用复制球员 ID"],["Remove All Evolutions","移除全部进化"],["Market Search Filters","市场搜索筛选"],["Move To Transfer List","移到转会列表"],["Sent To Transfer List","已送到转会列表"],["Lock / Unlock Players","锁定 / 解锁球员"],["Import Locked Players","导入已锁定的球员"],["Players sent to Club:","送到俱乐部的球员："],["Effective multiplier","实际倍率"],["Matching item scores","匹配的物品分数"],["Powered by Paletools","由 Paletools 提供"],["MercadoPago Donation","MercadoPago 捐赠"],["Enable FUTBIN search","启用 FUTBIN 搜索"],["Enable FUT.GG search","启用 FUT.GG 搜索"],["Enable Saved Filters","启用已保存的筛选"],["Enable Player Rating","启用球员评分"],["One Touch Smart Mode","一键智能模式"],["Prefer storage first","优先使用仓库"],["More completed first","完成更多的优先"],["Transfer List to SBC","转会列表填入 SBC"],["SBC Template Builder","SBC 模板搭建"],["Build Using Template","使用模板搭建"],["Add Multiple Players","添加多名球员"],["Duplicated Managers:","重复经理："],["No revisions found.","没有找到版本。"],["Mark as first owner","标为一手"],["Go to previous page","上一页"],["Allow special cards","允许特殊卡"],["SBC Builder Enhacer","SBC 搭建增强"],["Club Search Enhacer","俱乐部搜索增强"],["Hide Locked Players","隐藏已锁定球员"],["Quick Sell Multiple","批量快速出售"],["Display skill moves","显示花式"],["Lowest Market Price","市场最低价"],["SBC Challenges View","SBC 挑战视图"],["Redeem with Hideout","用暂存领取"],["Organize Unassigned","整理未分配"],["Duplicated Players:","重复球员："],["Discarded Managers:","丢弃的经理："],["Items sent to Club:","送到俱乐部的物品："],["Loading revisions…","正在加载版本…"],["Auto-fill by score","按分数自动填充"],["Refresh club cards","刷新俱乐部卡牌"],["Bought for (coins)","购入价格（金币）"],["Second Player Pick","第二张球员挑选"],["Fourth Player Pick","第四张球员挑选"],["Auto Solve Preview","自动求解预览"],["-- ALL MY PACKS --","-- 我的全部卡包 --"],["Hide Loaned Player","隐藏租借球员"],["Ratings Calculator","评分计算器"],["Pack Opener Result","开包结果"],["Count Club Players","统计俱乐部球员"],["Unassigned Go Back","未分配返回"],["Discarded Players:","丢弃的球员："],["Price unavailable","暂无价格"],["Uncollected cards","未收集的卡牌"],["Select a category","选择一个分类"],["Check for Updates","检查更新"],["Reset to Defaults","恢复默认"],["Display % buttons","显示百分比按钮"],["Send item to club","把物品送到俱乐部"],["First Player Pick","第一张球员挑选"],["Third Player Pick","第三张球员挑选"],["Fifth Player Pick","第五张球员挑选"],["Untradeables only","仅不可交易"],["Ignore evolutions","忽略进化"],["Solution {number}","方案 {number}"],["Newly added first","新上架的优先"],["View Requirements","查看要求"],["Display weak foot","显示逆足"],["Claim All Rewards","领取全部奖励"],["Stop Buying Packs","停止购买卡包"],["Repeat SBC Search","重复 SBC 搜索"],["Special Card Type","特殊卡类型"],["Duplicated to SBC","重复球员填入 SBC"],["Unassigned to SBC","未分配填入 SBC"],["Edit SBC Template","编辑 SBC 模板"],["Duplicated Items:","重复物品："],["Calculated grade","计算等级"],["Grades & rewards","等级与奖励"],["Loading players…","正在加载球员…"],["Copy Player Name","复制球员姓名"],["Enable Player Id","启用球员 ID"],["Holographic only","仅全息"],["Enable / Disable","启用 / 停用"],["Use storage only","只使用仓库"],["Players Per Page","每页球员数"],["My Packs counter","我的卡包计数"],["Show sell profit","显示出售利润"],["Claiming Rewards","正在领取奖励"],["Go To Pack Store","前往卡包商店"],["Improved Filters","改进的筛选"],["Display TOTW Tag","显示本周最佳标签"],["Discarded Items:","丢弃的物品："],["Collected cards","已收集的卡牌"],["Grading summary","等级摘要"],["Clear selection","清除选择"],["points to grade","距离下一等级还差"],["Score breakdown","分数明细"],["Required points","所需分数"],["Open Auto Snipe","打开自动截卡"],["Select a player","选择一名球员"],["Purchased cards","已购买的卡牌"],["PayPal Donation","PayPal 捐赠"],["One Touch Snipe","一键截卡"],["Quick sell item","快速出售物品"],["Go to next page","下一页"],["Repeat Last SBC","重复上一次 SBC"],["Transfer Market","转会市场"],["Search My Packs","搜索我的卡包"],["Tradeables Only","仅可交易"],["Expected Profit","预计利润"],["Sent To Storage","已送到仓库"],["Subs Management","替补管理"],["Hidden Injuries","隐藏伤病"],["Delay (seconds)","延迟（秒）"],["Fix EA mistakes","修复 EA 的错误"],["Total Managers:","经理总数："],["cards selected","张已选"],["Compare Prices","比较价格"],["Player Actions","球员操作"],["PlayStyles Lab","比赛风格实验室"],["Filter deleted","筛选已删除"],["Snipe +Buy Now","截卡 +立即购买"],["Export as HTML","导出为 HTML"],["Display League","显示联赛"],["Ratings to try","要尝试的评分"],["Decimal Rating","小数评分"],["Lock By Nation","按国家锁定"],["Lock By League","按联赛锁定"],["Lock By Rarity","按稀有度锁定"],["Locked Players","已锁定的球员"],["Hide Completed","隐藏已完成"],["Club Tradeable","俱乐部可交易"],["Display Button","显示按钮"],["Total Players:","球员总数："],["Price Tracker","价格追踪"],["Players Count","球员数量"],["FUTBIN search","FUTBIN 搜索"],["FUT.GG search","FUT.GG 搜索"],["Player Rating","球员评分"],["Compare price","比较价格"],["Reverse solve","反向求解"],["Best solution","最佳方案"],["Target Rating","目标评分"],["-- Sort By --","-- 排序 --"],["Club Analyzer","俱乐部分析"],["Export as CSV","导出为 CSV"],["Bought @ Club","购入于俱乐部"],["Grading Score","等级分数"],["Smart Builder","智能搭建"],["Sell Multiple","批量出售"],["Refresh Coins","刷新金币"],["Automatically","自动"],["Repeat Search","重复搜索"],["Send To Field","放到场上"],["Unlock Player","解锁球员"],["SBC Templates","SBC 模板"],["Show All SBCs","显示全部 SBC"],["Opened Packs:","已打开的卡包："],["Coins Earned:","获得金币："],["Open Gallery","打开展馆"],["Searching...","正在搜索…"],["Filter saved","筛选已保存"],["Player Picks","球员挑选"],["Sound Alerts","声音提示"],["Submit delay","提交延迟"],["Auto Refresh","自动刷新"],["Unlock Packs","解锁卡包"],["Locked Packs","已锁定的卡包"],["Used Players","已使用的球员"],["Packs Opener","开包工具"],["Move To Club","移到俱乐部"],["Sent To Club","已送到俱乐部"],["Send to Club","送到俱乐部"],["Lock Players","锁定球员"],["Lock By Club","按俱乐部锁定"],["Update Hours","更新小时数"],["Total Items:","物品总数："],["Coins Spent:","花费金币："],["Holographic","全息"],["Item scores","物品分数"],["Tag bonuses","标签加成"],["Points left","剩余分数"],["Player name","球员名称"],["Min Buy Now","最低立即购买"],["Max Buy Now","最高立即购买"],["Filter name","筛选名称"],["SBC Storage","SBC 仓库"],["Export Link","导出链接"],["Auto Solver","自动求解"],["Repetitions","重复次数"],["Filter SBCs","筛选 SBC"],["Pack Opener","开包"],["Club League","俱乐部联赛"],["Lock Player","锁定球员"],["Auto Relist","自动重新上架"],["Show cards","显示卡牌"],["Open Album","打开图鉴"],["Name (A–Z)","名称（A–Z）"],["Auto Snipe","自动截卡"],["Snipe +Bid","截卡 +出价"],["Unassigned","未分配"],["Import SBC","导入 SBC"],["Export SBC","导出 SBC"],["Auto Solve","自动求解"],["Repetition","重复"],["Challenges","挑战"],["Club Index","俱乐部索引"],["Club Pager","俱乐部翻页"],["Work Rates","工作态度"],["Quick Sell","快速出售"],["Open Speed","开包速度"],["Exclusions","排除项"],["Babysitter","看护"],["Max Rating","最高评分"],["Pale Picks","Pale 挑选"],["What's New","更新内容"],["Updating…","正在更新…"],["All cards","全部卡牌"],["Collected","已收集"],["tradeable","可交易"],["Duplicate","重复"],["Paletools","Paletools"],["Grid Mode","网格模式"],["Wide Mode","宽屏模式"],["Player ID","球员 ID"],["Reset Bid","重置出价"],["Challenge","挑战"],["Solve All","全部求解"],["Submitted","已提交"],["Calculate","计算"],["Open Pack","打开卡包"],["Discarded","已丢弃"],["Select...","选择…"],["Revision","版本"],["Category","分类"],["Sniping…","正在截卡…"],["Attempts","尝试次数"],["Complete","完成"],["Interval","间隔"],["Behavior","行为"],["Position","位置"],["Settings","设置"],["Cheapest","最便宜"],["Organize","整理"],["Selected","已选择"],["My Packs","我的卡包"],["Group by","分组依据"],["Hide SBC","隐藏 SBC"],["Actions","操作"],["Gallery","展馆"],["Sort by","排序"],["Missing","缺少"],["Include","纳入"],["Rewards","奖励"],["Untrack","取消追踪"],["Players","球员"],["Stopped","已停止"],["Enabled","已启用"],["invalid","无效"],["Loading","正在加载"],["Extinct","绝版"],["Suggest","建议"],["Minutes","分钟"],["Seconds","秒"],["Exclude","排除"],["Ratings","评分"],["Sniping","截卡"],["Go Back","返回"],["Buy now","立即购买"],["General","常规"],["Hideout","暂存"],["WARNING","警告"],["Please ","请"],["Player","球员"],["Rating","评分"],["Rarity","稀有度"],["Remove","移除"],["points","分"],["tokens","代币"],["Market","市场"],["League","联赛"],["Bought","已购买"],["Saving","正在保存"],["Import","导入"],["Export","导出"],["Hidden","已隐藏"],["Delete","删除"],["Search","搜索"],["Select","选择"],["Reload","重新加载"],["Filter","筛选"],["Profit","利润"],["Nation","国家"],["Price","价格"],["Owned","已拥有"],["cards","张卡"],["Grade","等级"],["Album","图鉴"],["Track","追踪"],["Start","开始"],["valid","有效"],["Clear","清除"],["W-D-L","胜-平-负"],["Pitch","球场"],["Hours","小时"],["ADD %","增加 %"],["Other","其他"],["Group","分组"],["Count","数量"],["Club","俱乐部"],["Stop","停止"],["From","从"],["Save","保存"],["Show","显示"],["Hide","隐藏"],["Edit","编辑"],["Bids","出价"],["SBCs","SBC"],["Mode","模式"],["Open","打开"],["Lock","锁定"],["None","无"],["Slow","慢"],["Fast","快"],["Team","球队"],["Add","添加"],["Set","套装"],["Use","使用"],["Min","最低"],["Max","最高"],["Bid","出价"],["All","全部"],["To","到"]];
  const EXACT = new Map();
  const TEMPLATES = [];

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function compile(en, zh) {
    const names = [];
    const pieces = en.split(/(\{[^}]+\}|#SECONDS#)/);
    let hasPlaceholder = false;
    const source = pieces.map(function (piece) {
      const named = /^\{([^}]+)\}$/.exec(piece);
      if (named) {
        hasPlaceholder = true;
        names.push(named[1]);
        return "([\\s\\S]+?)";
      }
      if (piece === "#SECONDS#") {
        hasPlaceholder = true;
        names.push("SECONDS");
        return "([\\s\\S]+?)";
      }
      return escapeRegExp(piece).replace(/(^|[^A-Za-z0-9])#(?![A-Za-z0-9])/g, function (match, prefix) {
        hasPlaceholder = true;
        names.push("#");
        return (prefix || "") + "([\\s\\S]+?)";
      });
    }).join("");
    if (!hasPlaceholder) return null;
    return { re: new RegExp("^" + source + "$"), names: names, zh: zh };
  }

  PAIRS.forEach(function (pair) {
    const en = pair[0];
    const zh = pair[1];
    const template = compile(en, zh);
    if (template) TEMPLATES.push(template);
    else EXACT.set(en, zh);
  });

  function applyTemplate(text) {
    for (let i = 0; i < TEMPLATES.length; i += 1) {
      const template = TEMPLATES[i];
      const match = template.re.exec(text);
      if (!match) continue;
      const values = { "#": match[1] };
      template.names.forEach(function (name, index) {
        values[name] = match[index + 1];
      });
      return template.zh.replace(/\{([^}]+)\}|#SECONDS#|#/g, function (token, name) {
        if (token === "#SECONDS#") return values.SECONDS || "";
        if (token === "#") return values["#"] || "";
        return values[name] == null ? token : values[name];
      });
    }
    return null;
  }

  function translate(text) {
    if (!text) return null;
    if (EXACT.has(text)) return EXACT.get(text);
    return applyTemplate(text);
  }

  const ALERTS = [
    ["You need to be in an SBC solution", "========== PALETOOLS 提示 ==========\n\n这个书签只能在 SBC 方案页使用。\n\nFUTBIN 地址需要包含 /squad/数字/sbc。\nEasySBC 地址需要包含 easysbc.io/sbc-solution。"],
    ["succesfully exported", "========== PALETOOLS ==========\n\nSBC 已导出。回到网页，打开同一组 SBC，点击“导入 SBC”。\n\n在此之前不要复制其他文字。"]
  ];

  function translateAlert(message) {
    const text = String(message || "");
    for (let i = 0; i < ALERTS.length; i += 1) {
      if (text.indexOf(ALERTS[i][0]) !== -1) return ALERTS[i][1];
    }
    return translate(text) || text;
  }

  if (globalThis.__PALETOOLS_ZH_TEST__) {
    globalThis.__PALETOOLS_ZH_TEST__.translate = translate;
    globalThis.__PALETOOLS_ZH_TEST__.translateAlert = translateAlert;
    return;
  }

  if (/futbin\.com|easysbc\.io/.test(location.hostname)) {
    const nativeAlert = window.alert;
    window.alert = function (message) {
      return nativeAlert.call(window, translateAlert(message));
    };
    return;
  }

  const MIN_GLOBAL = 8;
  let scheduled = false;

  function allowed(node, translatedFrom) {
    if (translatedFrom.length >= MIN_GLOBAL) return true;
    const parent = node.parentElement;
    if (!parent) return false;
    return Boolean(parent.closest("[class*='paletools']"));
  }

  function translateTextNode(node) {
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) return;
    const trimmed = raw.trim();
    const next = translate(trimmed);
    if (!next || next === trimmed || !allowed(node, trimmed)) return;
    node.nodeValue = raw.replace(trimmed, next);
  }

  function translateElement(element) {
    if (!element || element.nodeType !== 1) return;
    const tag = element.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA" || tag === "INPUT") return;
    const html = element.innerHTML;
    if (html && EXACT.has(html)) {
      element.innerHTML = EXACT.get(html);
      return;
    }
    const children = element.childNodes;
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (child.nodeType === 3) translateTextNode(child);
      else if (child.nodeType === 1) translateElement(child);
    }
  }

  function scan() {
    scheduled = false;
    if (document.body) translateElement(document.body);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(scan);
  }

  function installLayoutFix() {
    if (document.getElementById("paletools-zh-layout")) return;
    const style = document.createElement("style");
    style.id = "paletools-zh-layout";
    style.textContent = `
.donation-panel {
  display: inline-flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 12px !important;
  font-size: 10px !important;
  min-width: 68px;
  height: auto !important;
  margin-right: 12px !important;
  padding: 2px 8px !important;
  position: relative !important;
  overflow: visible !important;
  white-space: nowrap !important;
  vertical-align: middle;
}
.donation-panel > div {
  display: block !important;
  position: static !important;
  line-height: 12px !important;
  font-size: 10px !important;
  height: auto !important;
  white-space: nowrap !important;
}`;
    (document.head || document.documentElement).appendChild(style);
  }

  function boot() {
    installLayoutFix();
    scan();
    new MutationObserver(schedule).observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
