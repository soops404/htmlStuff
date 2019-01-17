
<?php   include 'php/header.php'; ?>


        <div class="row">
            <div class = "book col-sm-6">
               <h2>Glad you're here</h2>>
               <p>Enter the code you recived in the welcome email to get your download</p>
               <p>If you haven't subscribed to my email list, do so now and I'll see you back here soon.</p>
               <P> <a href = "index.php"> Join here </a></p>

            </div>             
            <div class="book col-sm-6">
                <h2>Sex in Zero Gravity</h2>
                <?php include 'php/getDownload.php'; ?>
                <div id="downloadLink"> Results here </div>
            </div>

            <script type="text/javascript">
                $(document).ready(function() {
                    $("#submitDownload").click(function() {
                        $("#downloadLink").load("php/verifyCode.php?CODE=".concat($("#codeValidation").val()) );
                    });
                });
            </script>
        </div>

  <?php include 'php/footer.php'; ?>