
import random
def gamble_simulator(initial_funds, win_rate, num_rounds):
    # 设置初始资金和每次投注总资金的10%
    total_funds = initial_funds
    bet_percentage = 0.2
    # result = random.choices([0, 1], weights=[1 - win_rate, win_rate])[0]

    for round_num in range(1, num_rounds + 1):
        result = random.choices([0, 1], weights=[1 - win_rate, win_rate])[0]
        print(f"第 {round_num} 局：{'赢' if result else '输'}")

        bet_amount = total_funds * bet_percentage
        # bet_amount = 300

        if result == 1:
            total_funds += bet_amount
        else:
            total_funds -= bet_amount

        # 输出本局投注金额和结束后的总资金
        print(f"本局投注金额：{bet_amount:.2f}，总资金：{total_funds:.2f}")

    print("游戏结束！")
    return total_funds

# 设置初始资金和胜率（0.5表示50%）
initial_funds = 1000
win_rate = 0.49

final_funds = gamble_simulator(initial_funds, win_rate, num_rounds=100)
print(f"最终总资金：{final_funds:.2f}")