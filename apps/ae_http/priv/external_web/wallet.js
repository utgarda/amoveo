wallet_doit1();
function wallet_doit1() {
    var button = document.createElement("input");
    button.type = "button";
    button.value = "test";
    button.id = "wallet_button_test";
    button.onclick = header_test;
    //button.onclick = test;
    document.body.appendChild(button);
    var db = {};
    function hash(input) {//array of bytes -- array of bytes
        var b = sjcl.codec.bytes.toBits(input);
        var x = sjcl.hash.sha256.hash(b);
        return sjcl.codec.bytes.fromBits(x);
    }
    function list_to_uint8(l) {
        var array = new Uint8Array(l.length);
        for (var i=0; i<l.length; i++) {
            a[i] = l[i];
        }
        return array;
    }
    function i2s(i, a) {
        return integer_to_array(i, a);
    }
    function string_to_array(x) {
        var a = new Uint8Array(x.length);
        for (var i=0; i<x.length; i++) {
            a[i] = x.charCodeAt(i);
        }
        return Array.from(a);
    }
    function array_to_string(x) {
        var a = "";
        for (var i=0; i<x.length ; i++) {
            a += String.fromCharCode(x[i]);
        }
        return a;
    }
    function integer_to_array(i, size) {
        var a = [];
        for ( var b = 0; b < size ; b++ ) {
            var c = a.length - b - 1;
            a.push(i % 256);
            i = Math.floor(i/256);
        }
        return a.reverse();
    }
    function serialize_header(x) {
        //convert the header to binary form.

        //Array [ "header", 0, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA…", "vvbP//eI8ByxXmJKP7/0hN32AUaOPjY/xnC…", "oZlvyvtE4uKNxKmQYuIZqQTRib+b5qh0u8Q…", 0, 1, 6, 0, 0 ]
        var height = x[1]; //4 bytes
        var prev_hash = atob(x[2]); //bin
        var trees_hash = atob(x[3]); //bin
        var txs_proof_hash = atob(x[4]); //bin
        var time = x[5]; //4 bytes
        var difficulty = x[6]; // 3 bytes
        var version = x[7]; // 2 bytes
        var nonce = atob(x[8]); // 32 bytes
        //var accumulative_difficulty = x[9]; //don't include
        var y = string_to_array(prev_hash);
        return y.concat(
            i2s(height, 4)).concat(
                i2s(time, 4)).concat(
                    i2s(version, 2).concat(
                        string_to_array(trees_hash).concat(
                            string_to_array(txs_proof_hash).concat(
                                i2s(difficulty, 2).concat(
                                    string_to_array(nonce))))));
    }
    function pair2sci(x, b) {
        return (256 * x) + b;
    }
    function hash2integer(h) {
        console.log("hash2integer");
        console.log(h);
        return hash2integer2(h.concat([255]), 0, 0);
    }
    function hash2integer2(h, i, n) {
        var x = h[i];
        if  ( x == 0 ) {
            return hash2integer2(h, i+1, n+(256*8));
        } else {
            console.log("hash2integer 2 ");
            console.log(n);
            return n + hash2integer3(x, h[i+1]);
        }
    }
    function dec2bin(dec){
        n = (dec).toString(2);
        n="00000000".substr(n.length)+n;
        return n;
    }
    function hash2integer3(byte1, byte2) {
        var x = dec2bin(byte1).concat(dec2bin(byte2));
        return hash2integer4(x, 0, 0);
    }
    function hash2integer4(binary, i, n) {
        var x = binary[i];
        if ( x == "0" ) { return hash2integer4(binary, i+1, n+256) }
        else {
            console.log("hash2integer 4 ");
            console.log(n);
            var b2 = binary.slice(i, i+8);
            var y = hash2integer5(b2) + n;
            console.log("hash2integer 4 2");
            console.log(7);
            return y;
        }
    }
    function hash2integer5(bin) {
        var x = 0;
        for (var i=0; i < bin.length; i++) {
            var y = bin[i];
            if ( y == "0" ) { x = x * 2; }
            else { x = 1 + (x * 2) }
        }
        return x;
    }
        //calculate X. ad 1 for every zero bit starting from the beginning of the h. Stop as soon as you reach a non-zero bit.
        // calculate B. take the next 8 bits from h after calculating x, and interpret it as an integer.
        //return pair2sci(X, B);
    function difficulty_should_be(hash) {
        var header = db[hash];
        if ( header == undefined ) {
            console.log(db);
            console.log(hash);
            console.log("received an orphan header");
            return "unknown parent";
        } else {
            var Diff = header[6];
            var RF = 2000; //constants:retarget_frequency();
            var height = header[1];
            var x = height % RF;
            if ( ( x == 0 ) && (! (height < 10) )) {
                return difficulty_should_be2(header);
            } else { return Diff; }
        }
    }
    function retarget(header, n) {
        var l = [];
        for (var i = n; i > 0; i--) {
            var t = header[5];//header.time
            var prev_hash = string_to_array(atob(header[2]));
            var header = db[prev_hash];
            l.push(t);
        }
        return l;
    }
    function median(l) {
        l.sort(function(a, b) {return a - b;});
        var half = Math.floor(l.length / 2);
        return l[half];
    }
    function difficulty_should_be2(header) {
        var f = Math.floor(2000 / 2); //constants:retarget frequencey is 2000
        var a1 = retarget(header, f, []);
        var times1 = a1.pop();
        var hash2000 = a1.pop();
        var a2 = retarget(hash2000, f, []);
        var times2 = a2.pop();
        var m1 = median(times1);
        var m2 = median(times2);
        var tbig = m1 - m2;
        var t = Math.floor(tbig / f);
        var nt = pow_recalculate(diff,
                                 600,//constants:block_time()
                                 Math.max(1, t));
        return Math.max(nt, 6452);//initial difficulty
        
    }
    function pow_recalculate(oldDiff, top, bottom) {
        var old = sci2int(oldDiff);
        var n = Math.max(1, Math.floor(( old * top ) / bottom));
        var d = int2sci(n);
        return Math.max(1, d);
    }
    function log2(x) {
        if (x == 1) { return 1; }
        else { return 1 + log2(Math.floor(x / 2))}
    }
    function exponent(a, b) {
        if (b == 0) { return 1; }
        else if (b == 1) { return a; }
        else if ((b % 2) == 0) {return exponent(a*a, Math.floor(b / 2)); }
        else {return a*exponent(a, b-1); }
    }
    function sci2int(x) {
        function pair2int(l) {
            var a = l.pop();
            var b = l.pop();
            var c = exponent(2, a);
            return Math.floor((c * (256 + b)) / 256);
        }
        function sci2pair(i) {
            var a = Math.floor(i / 256);
            var b = i % 256;
            return [a, b];
        }
        return pair2int(sci2pair(x));
    }
    function int2sci(x) {
        function pair2sci(l) {
            var a = l.pop();
            var b = l.pop();
            return (256 * a) + b;
        }
        function int2pair(x) {
            var a = log2(x) - 1;
            var c = exponent(2, a);
            var b = Math.floor((x * 256) / c) - 256;
            return [a, b];
        }
        return pair2sci(int2pair(x));
    }
    function check_pow(header) {
        //calculate Data, a serialized version of this header where the nonce is 0.
        var prev_hash = string_to_array(atob(header[2]));
        var diff0 = difficulty_should_be(prev_hash);
        var diff = header[6];
        if (diff == diff0) {
        //check if difficulty is the same as what we calculate it should be from the headers we already have.
            var data = header;
            data[8] = btoa(array_to_string(integer_to_array(0, 32)));
            //console.log(data);
            var h1 = hash(serialize_header(data));
            var nonce = atob(header[8]);
            var h2 = hash(h1.concat(
                integer_to_array(diff, 2)).concat(
                    string_to_array(nonce)));
            var I = hash2integer(h2);
            return I > diff;
        } else {
            return false;
            
        }
    }
    function hash_test() {
        console.log(hash([1,4,6,1,2,3,4,4]));
        //var array = new Uint8Array(4);
        var z = integer_to_array(1000, 4);
        var s = array_to_string(z);
        var a = atob("AAAD6A==");

        var g = string_to_array(a);
        var f = string_to_array(s);
        console.log(JSON.stringify(a));
        console.log(JSON.stringify(s));
        console.log(JSON.stringify(g));
        console.log(JSON.stringify(f));
        console.log(JSON.stringify(hash(g)));
        console.log(JSON.stringify(hash(f)));
    }
    function header_test() {
        variable_public_get(["headers", 2, 0], header_test2);
    }
    function header_test2(hl) {
        var header0 = hl[1];
        var hash0 = hash(serialize_header(header0));
        db[hash0] = header0;
        var header = hl[2];
        //console.log(header);
        var d = serialize_header(header);
        //console.log(JSON.stringify(d));
        var c = hash(d);
        //console.log(c);
        var e = check_pow(header);
        if ( e ) { console.log("good pow"); }
        else { console.log("bad pow"); }
        //calculate hash of header
        //check pow on header is valid for difficulty on header.
        //check that the difficulty on header is high enough.
        //store the hash/header pair into the db.
    }
}
