require('babel-core/register')

module.exports = {
    test_runner: {
        type : "mocha",
        options : {
            ui : "bdd",
            reporter : "list"
        }
    },
    output_folder: "build/nightwatch",
    src_folders: ["test"],
    test_settings: {
        default: {
            desiredCapabilities : {
                browserName : "safari",
                alwaysMatch: {
                    acceptInsecureCerts: false
                }
            },
            webdriver: {
                port: 4445,
                start_process: true,
                server_path: "/usr/bin/safaridriver",
                log_path: "build/nightwatch/"
            }
        },
        chrome: {
            desiredCapabilities: {
                browserName: "chrome",
                chromeOptions: { args: ["--headless"] }
            },
            webdriver: {
                port: 9515,
                start_process: true,
                server_path: require('chromedriver').path,
                log_path: "build/nightwatch/"
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: "firefox",
                'moz:firefoxOptions': {
                    args: ["--headless"]
                }
            },
            webdriver: {
                port: 4444,
                start_process: true,
                "server_path": "./node_modules/.bin/geckodriver",
                log_path: "build/nightwatch/"
            }
        },
        edge: {
            desiredCapabilities: {
                browserName: "MicrosoftEdge",
                'ms:edgeOptions': {
                    w3c: true,
                    args: ["--headless"]
                }
            },
            webdriver: {
                port: 9516,
                start_process: true,
                server_path: "",
                log_path: "build/nightwatch/"
            }
        }
    }
}
