<script type="text/php">
    if ( isset($pdf) ) {
        // OLD
        // $font = Font_Metrics::get_font("helvetica", "bold");
        // $pdf->page_text(72, 18, "{PAGE_NUM} of {PAGE_COUNT}", $font, 14, array(0,0,0));
        // v.0.7.0 and greater
        //$x = 520;
        //$y = 800;
        $x = 800 ;
        $y = 540;
        $text = "{PAGE_NUM}/{PAGE_COUNT}";
        $font = $fontMetrics->get_font("helvetica", "");
        $size = 12;
        $color = array(0,0,0);
        $word_space = 0.0;  //  default
        $char_space = 0.0;  //  default
        $angle = 0.0;   //  default
        $pdf->page_text($x, $y, $text, $font, $size, $color, $word_space, $char_space, $angle);
    }
</script>
<style>

    th, td {
        border: 1px solid black;
    }


    .styled-table {
        border-collapse: collapse;
        margin: 10px 10px 10px 10px;
        font-size: 0.9em;
        width: 100%;
        font-family: sans-serif;
        min-width: 400px;

        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }
    .styled-table thead tr {
        background-color: grey;
        color: #ffffff;
        text-align: center;
    }
    .styled-table th,
    .styled-table td {
        font-weight:  normal;
        padding: 5px 5px;
        text-align: center;
    }.styled-table tbody tr {
         border-bottom: 1px solid #dddddd;
     }



    .styled-table tbody tr:last-of-type {
        border-bottom: 2px solid #666060;
    }
    .styled-table tbody tr.active-row {
        font-weight: normal;
        color: #000000;
    }
</style>

