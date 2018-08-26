//use market:teset3() to generate this compiled binary.

function scalar_market_contract(direction, expires, maxprice, server_pubkey, period, amount, oid, bet_height, lower_limit, upper_limit, many) {
    var a;
    if (direction == 1) {
	a = string_to_array(atob("AAAAJxAAAAAAAngA"));
    } else if (direction == 2) {
	a = string_to_array(atob("AAAAAAAAAAAAAngA"));
    }
    var b = string_to_array(atob("/wAAAAADeAA="));
    var c = string_to_array(atob("AAAAAAR4AA=="));
    var d = string_to_array(atob("AAAAAAV4AA=="));
    var e = string_to_array(atob("AAAAAAZ4AA=="));
    var f = string_to_array(atob("AAAAAAd4AgAAACA="));
    var g = string_to_array(atob("AAAAAAF4AA=="));
    var h = string_to_array(atob("AAAAAAh4AgAAAEE="));
    var i;
    if (direction == 1) {
	i = string_to_array(atob("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"));
    } else if (direction == 2) {
	i = "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"
    }
    if (many != 10) {
	console.log("many must be 10");
	return "error";
    }
    console.log("market oid is ");
    console.log(oid);
    var contract = a.concat(
        integer_to_array(upper_limit, 4)).concat(
            b).concat(
		integer_to_array(lower_limit, 4)).concat(
		    c).concat(
			integer_to_array(bet_height, 4)).concat(
			    d).concat(
				integer_to_array(expires, 4)).concat(
				    e).concat(
					integer_to_array(maxprice, 4)).concat(
					    f).concat(
						string_to_array(atob(oid))).concat(
						    g).concat(
							integer_to_array(period, 4)).concat(
							    h).concat(
								string_to_array(atob(server_pubkey))).concat(i);
    console.log("compiled contract");
    console.log(JSON.stringify(contract));
    var contract2 =  btoa(array_to_string(contract));
    var codekey = ["market", 2, oid, expires, server_pubkey, period, oid, lower_limit, upper_limit];
    return ["bet", contract, amount, codekey, [-7, direction, maxprice]]; //codekey is insttructions on how to re-create the contract, so we can do pattern matching when updating channels.


)
function market_contract(direction, expires, maxprice, server_pubkey, period, amount, oid, bet_height) {
  //var a = string_to_array(atob("AAAAJxAAAAAAAXgA"));
    var a;
    var a2 = string_to_array(atob("AAAAAAJ4AA=="));
    var b = string_to_array(atob("AAAAAAN4AA=="));
    var c = string_to_array(atob("AAAAAAR4AgAAACA="));
    var d = string_to_array(atob("AAAAAAV4AA=="));
    var e = string_to_array(atob("AAAAAAZ4AgAAAEE="));
    var f;
    if (direction == 1) {
        a = string_to_array(atob("AAAAJxAAAAAAAXgA"));
        f = string_to_array(atob("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"));
    } else if (direction == 2) {
        a = string_to_array(atob("AAAAAAAAAAAAAXgA"));
        f = string_to_array(atob("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"));
    } else {
        console.log("that is an invalid direction");
        console.log(direction);
        return("invalid direction to bet");
    }
    console.log("market oid is ");
    console.log(oid);
    var g = a.concat(
        integer_to_array(bet_height, 4)).concat(
            a2).concat(
                integer_to_array(expires, 4)).concat(
                    b).concat(
                        integer_to_array(maxprice, 4)).concat(
                            c).concat(
                                string_to_array(atob(oid))).concat(
                                    d).concat(
                                        integer_to_array(period, 4)).concat(
                                            e).concat(
                                                string_to_array(atob(server_pubkey))).concat(
                                                    f);
    console.log("compiled contract");
    console.log(JSON.stringify(g));
    var contract =  btoa(array_to_string(g));
    var codekey = ["market", 1, oid, expires, server_pubkey, period, oid];
    return ["bet", contract, amount, codekey, [-7, direction, maxprice]]; //codekey is insttructions on how to re-create the contract, so we can do pattern matching when updating channels.
}

function market_trade(cd, amount, price, bet, oid) { //oid unused
    var market_spk = cd.me;
    console.log("market trade spk before ");
    console.log(JSON.stringify(market_spk));
    var cid = market_spk[6];
    var time_limit = 10000;//actually constants:time_limit div 10
    var space_limit = 100000;
    var cGran = 10000;
    var a = Math.floor((amount * price) / cGran);
    market_spk[3][0] = bet;
    market_spk[3] = ([-6]).concat(market_spk[3]);//add new bet to front
    market_spk[8] = market_spk[8] + 1; //nonce
    market_spk[5] = market_spk[5] + time_limit;// time_gas/10
    market_spk[4] = Math.max(market_spk[4], space_limit); //space_gas
    market_spk[7] = market_spk[7] - a; //amount
    console.log("market trade spk after ");
    console.log(JSON.stringify(market_spk));
    return market_spk;
}
