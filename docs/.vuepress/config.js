module.exports = {
    base: '/',
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            title: "NerveNetwork",
            lang: 'en-US',
            description: 'Decentralized digital asset service network.'
        },
        '/zh/': {
            title: "NerveNetwork",
            lang: 'zh-CN',
            description: '分布式数字资产服务网络'
        }
    },
    head: [
        ['link', {rel: 'icon', href: "/favicon.ico"}]
    ],
    themeConfig: {
        repo: 'NerveNetwork/nerve-docs',
        editLinks: true,
        docsDir: 'docs',
        docsBranch: 'master',
        sidebarDepth: 3,
        lastUpdated: 'Last Updated',
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                editLinkText: 'Edit this page on GitHub',
                nav: [
                    {text: "Guide", link: "/Guide/"},
                    {text: "Develop", link: "/Docs/"}
                ],
                sidebar: {
                    "/Guide/": [
                        {
                            title: 'Guide',
                            collapsable: false,
                            children: [
                                '',
                                // 'g_quickstart',
                                // 'g_download',
                                // 'g_wallet',
                                'g_dex',
                                'g_docker_install',
                                'g_eth',
                                'g_cmd',
                                'g_nrc_dex'
                                // 'g_node',
                                // 'g_precautions',
                                // 'g_wallet_ig',
                                // 'g_ex_ig',
                                // 'g_dapp_ig',
                                // 'g_tools',
                                // 'g_qa',
                            ]
                        },
                        {
                            title: 'Cross-Chain',
                            collapsable: false,
                            children: [
                                // 'c_table',
                                'c_nrc20',
                                'c_nuls_register',
                                'c_eth_to_hecochain'
                                // 'c_eth',
                                // 'c_btc',
                                // 'c_cross',
                            ]
                        },
                    ],
                    "/Docs/": [
                        // {
                        //     title: 'What is Nerve',
                        //     collapsable: false,
                        //     children: [
                        //         '',
                        //         "d_address",
                        //         "d_pocbft",
                        //         "d_assets",
                        //         "d_staking",
                        //         "d_feeding",
                        //         "d_cross",
                        //         "d_dex",
                        //         "d_commu",
                        //         "d_words",
                        //     ]
                        // },
                        // {
                        //     title: 'Nerve Client',
                        //     collapsable: false,
                        //     children: [
                        //         'n_overview',
                        //         'n_build',
                        //         'n_node_link',
                        //         'n_docker',
                        //         'n_cmd_less',
                        //         'n_cmd_link',
                        //         'n_upgrade',
                        //     ]
                        // },
                        // {
                        //     title: 'API',
                        //     collapsable:false,
                        //     children: [
                        //         'a_overview',
                        //         'a_nodeapi',
                        //         'a_public',
                        //         'a_dexapi',
                        //     ]
                        // },
                        // {
                        //     title: 'SDK',
                        //     collapsable:false,
                        //     children: [
                        //         's_overview',
                        //         's_java',
                        //         's_go',
                        //         's_c',
                        //         's_js',
                        //         's_ios',
                        //     ]
                        // },
                        {
                            title: 'DEX',
                            collapsable:false,
                            children: [
                                'dex_design',
                                'dex_api',
                                'dex_module',
                            ]
                        },
                        // {
                        //     title: 'DAPP',
                        //     collapsable:false,
                        //     children: [
                        //         'e_overview',
                        //         'e_xmind',
                        //         'e_example',
                        //     ]
                        // },
                    ]
                }
            },
            '/zh/': {
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                // Service Worker 的配置
                nav: [
                    {text: "指南", link: "/zh/Guide/"},
                    {text: "开发", link: "/zh/Docs/"}
                ],
                sidebar: {
                    "/zh/Guide/": [
                        {
                            title: '指南',
                            collapsable: false,
                            children: [
                                '',
                                // 'g_quickstart',
                                // 'g_download',
                                // 'g_wallet',
                                'g_docker_install',
                                'g_cmd',
                                'g_nrc_dex',
                                'c_lp_staking',
                                'c_eth_to_hecochain'
                                // 'g_node',
                                // 'g_precautions',
                                // 'g_wallet_ig',
                                // 'g_ex_ig',
                                // 'g_dapp_ig',
                                // 'g_tools',
                                // 'g_qa',

                            ]
                        },
                        {
                            title: '跨链课堂',
                            collapsable: false,
                            children: [
                                // 'c_table',
                                'c_nrc20',
                                'c_nuls_register',
                                'g_nervetoerc20',
                                'c_bep20_cross_erc20',
                                'c_heterogeneous'
                                // 'c_btc',
                                // 'c_cross',
                            ]
                        },
                    ],
                    "/zh/Docs/": [
                        // {
                        //     title: '认识Nerve',
                        //     collapsable: false,
                        //     children: [
                        //         '',
                        //         "d_address",
                        //         "d_pocbft",
                        //         "d_assets",
                        //         "d_staking",
                        //         "d_feeding",
                        //         "d_cross",
                        //         "d_dex",
                        //         "d_commu",
                        //         "d_words",
                        //     ]
                        // },
                        // {
                        //     title: '节点客户端',
                        //     collapsable: false,
                        //     children: [
                        //         'n_overview',
                        //         'n_build',
                        //         'n_node_link',
                        //         'n_docker',
                        //         'n_cmd_less',
                        //         'n_cmd_link',
                        //         'n_upgrade',
                        //     ]
                        // },
                        // {
                        //     title: 'API',
                        //     collapsable:false,
                        //     children: [
                        //         'a_overview',
                        //         'a_nodeapi',
                        //         'a_public',
                        //         'a_dexapi',
                        //     ]
                        // },
                        // {
                        //     title: 'SDK',
                        //     collapsable:false,
                        //     children: [
                        //         's_overview',
                        //         's_java',
                        //         's_go',
                        //         's_c',
                        //         's_js',
                        //         's_ios',
                        //     ]
                        // },
                        {
                            title: 'NerveDEX',
                            collapsable:false,
                            children: [
                                'dex_design',
                                'dex_api',
                                'dex_module'
                            ]
                        },
                        // {
                        //     title: 'DAPP',
                        //     collapsable:false,
                        //     children: [
                        //         'e_overview',
                        //         'e_xmind',
                        //         'e_example',
                        //     ]
                        // },
                    ]
                }
            }
        }
    }
}



