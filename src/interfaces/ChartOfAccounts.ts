export enum ChartOfAccounts {
    // Assets (1001-1999)
    Cash = 1001,                       // 現金及約當現金
    Bank_Deposits = 1002,              // 銀行存款
    Accounts_Receivable = 1101,        // 應收帳款
    Notes_Receivable = 1102,           // 應收票據
    Allowance_Bad_Debts = 1103,        // 壞帳準備
    Prepaid_Expenses = 1201,           // 預付費用
    Inventory = 1301,                  // 存貨
    Short_Term_Investments = 1401,      // 短期投資
    Long_Term_Investments = 1501,       // 長期投資
    Land = 1601,                       // 土地
    Buildings = 1602,                  // 建築物
    Equipment = 1603,                  // 機器設備
    Accumulated_Depreciation = 1604,    // 累計折舊
    Intangible_Assets = 1701,          // 無形資產
    Goodwill = 1702,                   // 商譽

    // Liabilities (2001-2999)
    Accounts_Payable = 2001,           // 應付帳款
    Notes_Payable = 2002,              // 應付票據
    Unearned_Revenue = 2101,           // 預收收入
    Accrued_Expenses = 2102,           // 應付費用
    Short_Term_Loans = 2201,           // 短期借款
    Long_Term_Loans = 2301,            // 長期借款
    Corporate_Bonds_Payable = 2302,     // 應付公司債
    Deferred_Tax_Liabilities = 2401,    // 遞延稅款負債

    // Equity (3001-3999)
    Capital_Stock = 3001,              // 股本
    Capital_Surplus = 3101,            // 資本公積
    Retained_Earnings = 3201,          // 保留盈餘
    Legal_Reserve = 3202,              // 法定盈餘公積
    Current_Earnings = 3301,           // 本期損益

    // Revenue (4001-4999)
    Sales_Revenue = 4001,              // 銷貨收入
    Service_Revenue = 4002,            // 服務收入
    Rental_Income = 4101,              // 租金收入
    Interest_Income = 4201,            // 利息收入
    Investment_Income = 4202,          // 投資收益
    Other_Income = 4301,               // 其他收入

    // Expenses (5001-5999)
    Cost_Of_Goods_Sold = 5001,         // 銷貨成本
    Salary_Expense = 5101,             // 工資薪資費用
    Rent_Expense = 5102,               // 租金費用
    Utilities_Expense = 5103,          // 水電費
    Depreciation_Expense = 5104,        // 折舊費用
    Interest_Expense = 5201,           // 利息費用
    Provision_For_Losses = 5202,        // 損失準備
    Other_Expenses = 5301,             // 其他費用
    Business_Tax = 5401,               // 營業稅
    Income_Tax = 5402                  // 所得稅
}